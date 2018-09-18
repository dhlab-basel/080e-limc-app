import { timer } from "rxjs/observable/timer";

export class ProgressBar {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * Current process in percent
     */
    percent: number = 0;

    /**
     * Determines whether the progress bar is actively updated or not
     * @type {boolean}
     */
    isActive: boolean = false;


    /////////////
    // METHODS //
    /////////////


    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Resets the current progress and disables the progress bar.
     */
    reset() {
        this.percent = 0;
        this.isActive = false;
    }

    /**
     * Sets the current progress.
     * @param {number} percent
     */
    setProgress(percent: number) {
        this.percent = percent;
        this.isActive = true;

        if (percent === 100) {
            timer(1000).subscribe(_ => this.reset());
        }
    }

}
