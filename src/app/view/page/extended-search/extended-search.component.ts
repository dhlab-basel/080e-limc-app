import { Component, OnInit } from '@angular/core';

import { LimcService } from "../../../model/service/limc.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { LimcFormControl } from "../../../model/other/limc-form-control";

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

        this.formControls = [
            new LimcFormControl("select", "test", {
                disabled: false,
                value: "Test"
            }),
            new LimcFormControl("input", "test", {
                disabled: false,
                value: "Test"
            })
        ];

        const formGroup: any = {};
        for (let formControl of this.formControls) {
            formGroup["test"] = formControl;
        }

        this.formGroup = this.formBuilder.group(formGroup);

        console.log(this.formGroup);

        //console.log(this.form.controls.name.value.value)

    }


    /////////////
    // METHODS //
    /////////////


    addControl() {

        const formControl: LimcFormControl = new LimcFormControl("input", "test", "lol");
        this.formControls.push(formControl);
        this.formGroup.addControl("test2", formControl);
    }

    removeControl(formControl: LimcFormControl) {

        this.formControls = this.formControls.filter(
            (c: LimcFormControl): boolean => {
                return c.name !== formControl.name
            }
        );
        this.formGroup.removeControl("test2");

    }

    showControl(c) {
        console.log(this.formGroup);
        console.log(c);
    }

}
