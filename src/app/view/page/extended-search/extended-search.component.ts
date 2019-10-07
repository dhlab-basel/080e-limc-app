import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

import { LimcService } from "../../../model/service/limc.service";

import { LimcExtendedSearchProperty } from "../../../model/other/limc-extended-search-property";
import { SalsahService } from "../../../model/service/salsah.service";
import { NodeData } from "../../../model/apiresult/node-data";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-extended-search",
    templateUrl: "./extended-search.component.html",
    styleUrls: ["./extended-search.component.scss"]
})
/**
 * Extended search page.
 */
export class ExtendedSearchComponent implements OnInit {

    ///////////////
    // CONSTANTS //
    ///////////////


    /**
     * The amount of entries to load per search
     */
    readonly searchLimit: number = 3;


    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The modal
     */
    @ViewChild("modal", { static: true }) modal: ElementRef;

    /**
     * Modal body html
     */
    modalBody: string = "";

    /**
     * Search properties
     */
    searchProperties: LimcExtendedSearchProperty[] = [];

    /**
     * Determines the status of the form
     */
    get formValid(): boolean {

        if (this.limcService.extendedSearch.formArray instanceof FormArray === false) return false;

        for (const formGroup of this.limcService.extendedSearch.formArray.controls) {
            if (formGroup.invalid) return false;
        }

        if (this.limcService.extendedSearch.formArray.length === 0) return false;

        return true;

    }


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Constructor.
     * @param formBuilder
     * @param modalService
     * @param salsahService
     * @param limcService
     */
    constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private salsahService: SalsahService, public limcService: LimcService) {}

    /**
     * NgOnInit.
     */
    ngOnInit() {

        // Set up the properties
        this.searchProperties = [
            LimcExtendedSearchProperty.create(70, 619, "ADVANCED_SEARCH.MONUMENT_ID"),
            LimcExtendedSearchProperty.create(70, 378, "ADVANCED_SEARCH.MONUMENT_ARTIST").withSelectionId(47),
            LimcExtendedSearchProperty.create(70, 379, "ADVANCED_SEARCH.MONUMENT_CATEGORY").withSelectionId(48),
            LimcExtendedSearchProperty.create(70, 353, "ADVANCED_SEARCH.MONUMENT_DESCRIPTION"),
            LimcExtendedSearchProperty.create(70, 327, "ADVANCED_SEARCH.MONUMENT_DISCOVERY").withSelectionId(42),
            LimcExtendedSearchProperty.create(70, 356, "ADVANCED_SEARCH.MONUMENT_NAME").withSelectionId(65),
            LimcExtendedSearchProperty.create(70, 375, "ADVANCED_SEARCH.MONUMENT_OBJECT").withSelectionId(44),
            LimcExtendedSearchProperty.create(70, 380, "ADVANCED_SEARCH.MONUMENT_TECHNIQUE").withSelectionId(49),
            LimcExtendedSearchProperty.create(82, 362, "ADVANCED_SEARCH.INVENTORY_NUMBER"),
            LimcExtendedSearchProperty.create(83, 334, "ADVANCED_SEARCH.MUSEUM_NAME"),
            LimcExtendedSearchProperty.create(83, 333, "ADVANCED_SEARCH.MUSEUM_CITY"),
            LimcExtendedSearchProperty.create(84, 363, "ADVANCED_SEARCH.LIMC_ARTICLE").withSelectionId(37),
            LimcExtendedSearchProperty.create(84, 365, "ADVANCED_SEARCH.LIMC_NUMBER"),
            // LimcExtendedSearchProperty.create(84, 364, "ADVANCED_SEARCH.LIMC_VOLUME_NUMBER").withSelectionId(38),
            // LimcExtendedSearchProperty.create(86, 370, "ADVANCED_SEARCH.THESCRA_MAIN_CHAPTER"),
            LimcExtendedSearchProperty.create(86, 334, "ADVANCED_SEARCH.THESCRA_CHAPTER_NAME"),
            LimcExtendedSearchProperty.create(85, 368, "ADVANCED_SEARCH.THESCRA_NUMBER"),
            // LimcExtendedSearchProperty.create(86, 371, "ADVANCED_SEARCH.THESCRA_CHAPTER_SHORTNAME"),
            // LimcExtendedSearchProperty.create(86, 350, "ADVANCED_SEARCH.THESCRA_SEQUENCE_NUMBER"),
            // LimcExtendedSearchProperty.create(86, 373, "ADVANCED_SEARCH.THESCRA_VOLUME_NUMBER")
        ];

        // Add an initial form group
        if (this.limcService.extendedSearch.formArray instanceof FormArray === false) {
            this.addGroup();
        }

    }


    /////////////
    // METHODS //
    /////////////


    /**
     * Property formatter
     * @param option
     */
    propertyFormatter = (option: LimcExtendedSearchProperty) => {
        return option.propertyName;
    };

    /**
     * Gets the search properties that are allowed in the selection
     * @return
     */
    getSearchProperties(): LimcExtendedSearchProperty[] {

        if (this.limcService.extendedSearch.formArray.length <= 1) return this.searchProperties;

        const resourceTypeId: number = (<FormGroup> this.limcService.extendedSearch.formArray.controls[0]).controls.select.value.resourceTypeId;

        return this.searchProperties.filter(v => v.resourceTypeId === resourceTypeId);

    }

    /**
     * Performs the extended search and saves the data.
     * @param reset
     */
    search(reset?: boolean) {

        // Build the LIMC search query
        const data: { resourceTypeId: number, propertyId: number, value: number | string }[] = [];
        for (const formGroup of this.limcService.extendedSearch.formArray.controls) {

            if (formGroup instanceof FormGroup === false) continue;

            const value: number | NodeData = (<FormGroup> formGroup).controls.input.value;

            data.push({
                resourceTypeId: (<FormGroup> formGroup).controls.select.value.resourceTypeId,
                propertyId: (<FormGroup> formGroup).controls.select.value.propertyId,
                value: value instanceof NodeData ? value.id : value
            });

        }

        this.limcService.searchMonumentsByProperties(data, this.searchLimit, reset);

    }

    /**
     * Fired when a property has been selected.
     * @param formGroup
     * @param searchProperty
     */
    onPropertySelected(formGroup: FormGroup, searchProperty: LimcExtendedSearchProperty) {

        if (searchProperty.selectionId > 0) {
            if (searchProperty.selectionNodes.length === 0) {
                searchProperty.fetchSelectionData(this.salsahService);
            }

        }

        // Reset the according field
        formGroup.controls.input.setValue("");

    }

    /**
     * Adds a new form group.
     * A form group includes two form controls, a select and a value field.
     */
    addGroup() {

        const formGroup: FormGroup = this.formBuilder.group({
            select: undefined,
            input: undefined
        });

        if (this.limcService.extendedSearch.formArray instanceof FormArray) {
            this.limcService.extendedSearch.formArray.controls.push(formGroup);
        } else {
            this.limcService.extendedSearch.formArray = this.formBuilder.array([formGroup]);
        }

    }

    /**
     * Removes a form group at a specific index of the formArray array.
     * @param index
     */
    removeGroup(index: number) {
        this.limcService.extendedSearch.formArray.controls.splice(index, 1);
    }

    /**
     * Opens the modal with the help text.
     */
    openHelpModal() {

        this.modalBody = (
            "In Advanced search you can put together complex searches by combining multiple Search fields. Just press the “Add search field” button to add another Search field. The Search fields are combined with logical “AND”.<br /><br />" +
            "The wildcard symbol for any text parts (letters or words) is “%”.<br /><br />" +
            "<strong>Example 1:</strong><br />" +
            "Choose Search field “LIMC Article” and select “Achilleus” in Search term. Click “Add search field”.<br />" +
            "Choose Search field “LIMC Number” and enter “%” in Search term.<br />" +
            "This will show all items listed in the LIMC Article “Achilleus”.<br /><br />" +
            "<strong>Example 2:</strong><br />" +
            "Choose Search field “Mythological figure” and select “Acheloos” in Search term. Click “Add Search Field”.<br />" +
            "Choose Search field “Mythological figure” and enter “Herakles” in Search term. This will show all items where Acheloos and Herakles appear together.<br /><br />" +
            "<strong>Example 3:</strong><br />" +
            "Choose Search field “ThesCRA chapter name” and enter “%Heroisierung%” in Search term. This will show all items listed in the ThesCRA chapter “Heroisierung”. Please always use wildcards.<br /><br />" +
            "<strong>Example 4:</strong><br />" +
            "Choose Search field “Museum Name” and enter “%Louvre%” in Search term. This will show all objects in the Musée du Louvre.<br /><br />" +
            "<strong>Example 5:</strong><br />" +
            "Choose Search field “Museum Name” and enter “British%” in Search term. This will show all objects in the British Museum, the British Library, ..."
        );

        this.openModal();

    }

    /**
     * Opens the modal with the documentation text.
     */
    openDocumentationModal() {

        this.modalBody = (
            "Search Field Definitions:<br /><br />" +
            "<table class='table table-responsive'>" +
            "<tr><td class='text-bold'>ID</td><td>A unique internal number allocated to each object.</td></tr>" +
            "<tr><td class='text-bold'>Artist</td><td>The name of the artist – painter or potter. Multiple attributions are possible. After entering the first letter a menu pops up that allows to select from.</td></tr>" +
            "<tr><td class='text-bold'>Category</td><td>Category of the object, e.g. “sculpture”. After entering the first letter a menu pops up that allows to select from.</td></tr>" +
            "<tr><td class='text-bold'>Description</td><td>Description of the object. Always use wildcards – e.g. %Hera% when searching in descriptions.</td></tr>" +
            "<tr><td class='text-bold'>Place of discovery</td><td>The original find place of an object if known. After entering the first letter a menu pops up that allows to select from.</td></tr>" +
            "<tr><td class='text-bold'>Mythological figure</td><td>Name of a mythological figure, e.g. “Medeia”. After entering the first letter a menu pops up that allows to select from.</td></tr>" +
            "<tr><td class='text-bold'>Object</td><td>Object, e.g. “altar” or “alabastron”. After entering the first letter a menu pops up that allows to select from.</td></tr>" +
            "<tr><td class='text-bold'>Technique</td><td>Technique, e.g. “red-figure”. Select directly from a menu.</td></tr>" +
            "<tr><td class='text-bold'>Inventory number</td><td>Inventory / Collection / Catalogue number of objects within the museum / collection.</td></tr>" +
            "<tr><td class='text-bold'>Museum name</td><td>Name of the museum or the collection.</td></tr>" +
            "<tr><td class='text-bold'>Museum city</td><td>Location of the museum or the collection.</td></tr>" +
            "<tr><td class='text-bold'>LIMC article</td><td>Name of LIMC article, e.g. “Achilleus”. After entering the first letter a menu pops up that allows to select from.</td></tr>" +
            "<tr><td class='text-bold'>LIMC article number</td><td>Number of the object in a LIMC article in the printed books.</td></tr>" +
            "<tr><td class='text-bold'>ThesCRA chapter name</td><td>Name of ThesCRA chapter, e.g. “%Opfer%”.</td></tr>" +
            "<tr><td class='text-bold'>ThesCRA article Number</td><td>Number of the object in a ThesCRA chapter in the printed books.</td></tr>" +
            "</table>"
        );

        this.openModal();

    }

    /**
     * Opens the modal.
     */
    openModal() {
        this.modalService.open(this.modal, { size: "lg" });
    }

}
