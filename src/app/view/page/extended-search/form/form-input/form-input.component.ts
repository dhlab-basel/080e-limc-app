import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { LimcFormControl } from "../../../../../model/other/limc-form-control";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => FormInputComponent),
    }]
})
export class FormInputComponent implements OnInit, ControlValueAccessor {

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
