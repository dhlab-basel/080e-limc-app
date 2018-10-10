import {
    AbstractControl,
    AbstractControlOptions,
    AsyncValidatorFn,
    FormControl, FormGroup,
    ValidatorFn
} from "@angular/forms";

export class LimcFormGroup extends FormGroup {

    /**
     * Creates a new `FormGroup` instance.
     *
     * @param name The string name
     *
     * @param controls A collection of child controls. The key for each child is the name
     * under which it is registered.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions
     *
     */
    constructor(public name: string, controls: {
        [key: string]: AbstractControl;
    }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
    }

}