import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

import { LimcService } from "../../../model/service/limc.service";

import { SelectionData } from "../../../model/apiresult/selection-data";
import { LimcSearchProperty } from "../../../model/other/limc-search-property";
import { SalsahService } from "../../../model/service/salsah.service";
import { NodeData } from "../../../model/apiresult/node-data";

@Component({
    selector: 'app-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
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
    readonly searchLimit: number = 12;


    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The form array
     */
    formArray: FormArray|null;

    /**
     * Search properties
     */
    searchProperties: LimcSearchProperty[] = [];

    /**
     * Determines the status of the form
     */
    get formValid(): boolean {

        if (this.formArray instanceof FormArray === false) return false;

        for (let formGroup of this.formArray.controls) {
            if (formGroup.invalid) return false;
        }

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

            LimcSearchProperty.create(70, 619, "Monument ID"),
            LimcSearchProperty.create(70, 378, "Monument Artist").withSelectionId(47),
            LimcSearchProperty.create(70, 379, "Monument Category").withSelectionId(48),
            LimcSearchProperty.create(70, 327, "Monument Discovery").withSelectionId(42),
            LimcSearchProperty.create(70, 356, "Monument Name").withSelectionId(65),
            LimcSearchProperty.create(70, 375, "Monument Object").withSelectionId(44),
            LimcSearchProperty.create(70, 380, "Monument Technique").withSelectionId(49),
            LimcSearchProperty.create(82, 362, "Inventory Number"),
            LimcSearchProperty.create(83, 334, "Museum Name"),
            LimcSearchProperty.create(83, 333, "Museum City"),
            LimcSearchProperty.create(84, 363, "LIMC Article"),
            LimcSearchProperty.create(84, 365, "LIMC Number"),
            LimcSearchProperty.create(86, 370, "ThesCRA Chapter"),
            LimcSearchProperty.create(86, 350, "ThesCRA Number"),

/*

            { resourceTypeId: 70, propertyId: "limc:city", propertyName: "Monument City" },
            { resourceTypeId: 70, propertyId: "limc:category", propertyName: "Monument Category" },
            { resourceTypeId: 70, propertyId: "limc:discovery", propertyName: "Monument Discovery" },
            { resourceTypeId: 70, propertyId: "limc:name", propertyName: "Monument Name" },
            { resourceTypeId: 70, propertyId: "limc:object", propertyName: "Monument Object" },
            { resourceTypeId: 70, propertyId: "limc:technique", propertyName: "Monument Technique" },
            { resourceTypeId: 70, propertyId: 362, propertyName: "Inventory Number" },
            { resourceTypeId: 83, propertyId: 334, propertyName: "Museum Name" },
            { resourceTypeId: 83, propertyId: 333, propertyName: "Museum City" },
            { resourceTypeId: 84, propertyId: 363, propertyName: "LIMC Article" },
            { resourceTypeId: 84, propertyId: 365, propertyName: "LIMC Number" },
            { resourceTypeId: 86, propertyId: 370, propertyName: "ThesCRA Chapter" },
            { resourceTypeId: 86, propertyId: 350, propertyName: "ThesCRA Number " }*/

        ];


        // Add an initial form group
        setTimeout(this.addGroup());

    }


    /////////////
    // METHODS //
    /////////////


    /**
     * Property formatter
     * @param option
     */
    propertyFormatter = (option: LimcSearchProperty) => {
        return option.propertyName;
    };

    /**
     * Performs the extended search and saves the data.
     * @param reset
     */
    search(reset?: boolean) {

        // Build the LIMC search query
        let data: { resourceTypeId: number, propertyId: number, value: number | string }[] = [];
        for (let formGroup of this.formArray.controls) {

            if (formGroup instanceof FormGroup === false) continue;

            const value: number | NodeData = (<FormGroup> formGroup).controls.input.value;

            data.push({
                resourceTypeId: (<FormGroup> formGroup).controls.select.value.resourceTypeId,
                propertyId: (<FormGroup> formGroup).controls.select.value.propertyId,
                value: value instanceof NodeData ? value.id : value
            });

        }

        if (reset) {
            this.limcService.searchMonumentsByProperties(data, 0, this.searchLimit);
        } else {
            this.limcService.searchMonumentsByProperties(data, this.limcService.search.monuments.length, this.searchLimit);
        }

    }

    /**
     * Fired when a property has been selected.
     * @param formGroup
     * @param searchProperty
     */
    onPropertySelected(formGroup: FormGroup, searchProperty: LimcSearchProperty) {

        if (searchProperty.selectionId > 0) {
            if (searchProperty.selectionNodes.length === 0) {
                searchProperty.fetchSelectionData(this.salsahService);
            }

        }

        // Reset the according field
        formGroup.controls.input.setValue('');

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
