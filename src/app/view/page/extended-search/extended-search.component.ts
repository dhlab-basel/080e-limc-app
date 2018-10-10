import { Component, OnInit } from '@angular/core';

import { LimcService } from "../../../model/service/limc.service";
import { Form, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LimcFormControl } from "../../../model/other/limc-form-control";
import { LimcFormGroup } from "../../../model/other/limc-form-group";

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


    ////////////////
    // PROPERTIES //
    ////////////////


    test: string = "hu";

    currentId: number = 1;


    formArray: FormArray;

    formGroup: FormGroup;

    formControls: LimcFormControl[] = [];

    /**
     * Search properties
     * @type {any[]}
     */
    searchProperties: any[] = [
        { name: 1, value: "Name" },
        { name: 2, value: "City" },
    ];


    /////////////
    // METHODS //
    /////////////

    constructor(private formBuilder: FormBuilder, public limcService: LimcService) {
    }

    ngOnInit() {

        //const formGroup: any = {};
        //this.formGroup = this.formBuilder.group(formGroup);

        //this.addControl();

/*
        const formGroup: any = {
            properties: this.formBuilder.array([])
        };
        //for (let formControl of this.formControls) {
        //    formGroup["test"] = formControl;
        //}

        this.formGroup = this.formBuilder.group(formGroup);

        console.log(this.formGroup);

        //console.log(this.form.controls.name.value.value)*/


this.addGroup();

    }


    /////////////
    // METHODS //
    /////////////


    search() {

        // Build the LIMC search query

        console.log(this.formArray.value);

    }


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

        console.log(this.formArray);

    }

    removeGroup(formGroup: FormGroup) {

        console.log(this.formArray);
        console.log(this.formGroup);

        this.formArray.controls = this.formArray.controls.filter(c => c === formGroup);


    }


    addControl() {

        // Add selection
        const formControlSelect: LimcFormControl = new LimcFormControl("select", "property[" + this.currentId + "]", "lol");
        this.formControls.push(formControlSelect);
        this.formGroup.addControl(formControlSelect.name, formControlSelect);

        // Add input
        const formControlInput: LimcFormControl = new LimcFormControl("input", "value[" + this.currentId + "]", "lol");
        this.formControls.push(formControlInput);
        this.formGroup.addControl(formControlInput.name, formControlInput);

        this.currentId++;

    }

    removeControl(formControl: LimcFormControl) {

        const name1: string = formControl.name;
        let name2: string = name1.replace("value", "property");
        if (name1.indexOf("property") >= 0) {
            name2 = name1.replace("property", "value");
        }

        this.formControls = this.formControls.filter(
            (c: LimcFormControl): boolean => {
                return c.name !== name1 && c.name !== name2;
            }
        );

        this.formGroup.removeControl(name1);
        this.formGroup.removeControl(name2);

    }

    showControl(c) {
        console.log(this.formGroup);
        console.log(c);
    }

}
