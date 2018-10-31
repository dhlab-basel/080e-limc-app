import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { NodeData } from "../../../../../model/apiresult/node-data";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-form-input",
    templateUrl: "./form-input.component.html",
    styleUrls: ["./form-input.component.css"],
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
    @Input() formControl: FormControl;

    /**
     * Options in case of typeahead
     */
    @Input() options: NodeData[] = [];

    /**
     * Output event
     */
    @Output() enterPressed: EventEmitter<void> = new EventEmitter<void>();


    /////////////
    // METHODS //
    /////////////


    constructor(private translateService: TranslateService) {}
    ngOnInit() {}

    typeaheadFormatter = (node: NodeData) => node instanceof NodeData ? node.getLabel(this.translateService) : "";

    typeaheadSearch = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => term === "" ? []
                : this.options.filter(
                    (node: NodeData) => {
                        const label = node.getLabel(this.translateService);
                        return label !== "" && label.toLowerCase().startsWith(term.toLowerCase());
                    }).slice(0, 10))
        );

    /**
     * Value formatter
     * @param option
     */
    selectValueFormatter = (option: NodeData) => {
        return option.getLabel(this.translateService);
    };


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
     * Registers a callback function that should be called when the control"s value changes in the UI.
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
