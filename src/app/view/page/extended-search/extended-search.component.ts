import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

import { LimcService } from "../../../model/service/limc.service";

import { LimcExtendedSearchProperty } from "../../../model/other/limc-extended-search-property";
import { SalsahService } from "../../../model/service/salsah.service";
import { NodeData } from "../../../model/apiresult/node-data";

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
     * The form array
     */
    formArray: FormArray | null;

    /**
     * Search properties
     */
    searchProperties: LimcExtendedSearchProperty[] = [];

    /**
     * Determines the status of the form
     */
    get formValid(): boolean {

        if (this.formArray instanceof FormArray === false) return false;

        for (const formGroup of this.formArray.controls) {
            if (formGroup.invalid) return false;
        }

        if (this.formArray.length === 0) return false;

        return true;

    }


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Constructor.
     * @param formBuilder
     * @param salsahService
     * @param limcService
     */
    constructor(private formBuilder: FormBuilder, private salsahService: SalsahService, public limcService: LimcService) {
    }

    /**
     * NgOnInit.
     */
    ngOnInit() {

        // Set up the properties
        this.searchProperties = [

            LimcExtendedSearchProperty.create(70, 619, "Monument ID"),
            LimcExtendedSearchProperty.create(70, 378, "Monument Artist").withSelectionId(47),
            LimcExtendedSearchProperty.create(70, 379, "Monument Category").withSelectionId(48),
            LimcExtendedSearchProperty.create(70, 327, "Monument Discovery").withSelectionId(42),
            LimcExtendedSearchProperty.create(70, 356, "Monument Name").withSelectionId(65),
            LimcExtendedSearchProperty.create(70, 375, "Monument Object").withSelectionId(44),
            LimcExtendedSearchProperty.create(70, 380, "Monument Technique").withSelectionId(49),
            LimcExtendedSearchProperty.create(82, 362, "Inventory Number"),
            LimcExtendedSearchProperty.create(83, 334, "Museum Name"),
            LimcExtendedSearchProperty.create(83, 333, "Museum City"),
            LimcExtendedSearchProperty.create(84, 363, "LIMC Article").withSelectionId(37),
            LimcExtendedSearchProperty.create(84, 365, "LIMC Number"),
            LimcExtendedSearchProperty.create(86, 370, "ThesCRA Chapter"),
            LimcExtendedSearchProperty.create(86, 350, "ThesCRA Number"),

        ]; // TODO  // use http://www.salsah.org/api/resources?restype_id=86&searchstr=&numprops=2&limit=11

        // Add an initial form group
        this.addGroup();

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

        if (this.formArray.length <= 1) return this.searchProperties;

        const resourceTypeId: number = (<FormGroup> this.formArray.controls[0]).controls.select.value.resourceTypeId;

        return this.searchProperties.filter(v => v.resourceTypeId === resourceTypeId);

    }

    /**
     * Performs the extended search and saves the data.
     * @param reset
     */
    search(reset?: boolean) {

        // Build the LIMC search query
        const data: { resourceTypeId: number, propertyId: number, value: number | string }[] = [];
        for (const formGroup of this.formArray.controls) {

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

        if (this.formArray instanceof FormArray) {
            this.formArray.controls.push(formGroup);
        } else {
            this.formArray = this.formBuilder.array([formGroup]);
        }

    }

    /**
     * Removes a form group at a specific index of the formArray array.
     * @param index
     */
    removeGroup(index: number) {
        this.formArray.controls.splice(index, 1);
    }

}
