import {
    AbstractControlOptions,
    AsyncValidatorFn,
    FormControl,
    ValidatorFn
} from "@angular/forms";

export class LimcFormControl extends FormControl {

    /**
     * Creates a new `FormControl` instance.
     *
     * @param type The type of the control: 'input'|'select'
     *
     * @param name The string name
     *
     * @param formState Initializes the control with an initial value,
     * or an object that defines the initial value and disabled state.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions
     *
     */
    constructor(public type: string, public name: string, formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(formState, validatorOrOpts, asyncValidator);
    }

}