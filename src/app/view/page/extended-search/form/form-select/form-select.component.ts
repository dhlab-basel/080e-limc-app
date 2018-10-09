import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { LimcFormControl } from "../../../../../model/other/limc-form-control";

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrls: ['./form-select.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => FormSelectComponent),
    }]
})
export class FormSelectComponent implements OnInit {

    ///////////////
    // CONSTANTS //
    ///////////////

    ////////////////
    // PROPERTIES //
    ////////////////

    /**
     * Form control input
     */
    @Input() formControl: LimcFormControl;

    @Input() options: any[] = [];

    /////////////
    // METHODS //
    /////////////


    constructor() {}
    ngOnInit() {}


    ////////////////
    // OVERRIDDEN //
    ////////////////


    /**
     * Invoked when the model has been changed
     */
    onChange: (_: any) => void = (_: any) => {};

    /**
     * Invoked when the model has been touched
     */
    onTouched: () => void = () => {};

    /**
     * Writes a new item to the element.
     * @param value the value
     */
    writeValue(value: number): void {
        this.onChange(value);
    }

    /**
     * Registers a callback function that should be called when the control's value changes in the UI.
     * @param fn
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Registers a callback function that should be called when the control receives a blur event.
     * @param fn
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

}
