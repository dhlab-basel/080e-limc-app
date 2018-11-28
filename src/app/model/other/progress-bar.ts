import { timer } from "rxjs/index";
import { LimcService } from "../service/limc.service";

export class ProgressBar {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * Current process in percent
     */
    private _percent: number = 0;

    get percent(): number {
        if (this.limcService instanceof LimcService) {
            if (this.limcService.subscriptions.length > 0) {
                console.log(this.limcService.subscriptions.length + " | " + 100 * ( this.limcService.subscriptions.length - this.limcService.runningSubscriptions ) / this.limcService.subscriptions.length);
                return 100 * ( this.limcService.subscriptions.length - this.limcService.runningSubscriptions ) / this.limcService.subscriptions.length;
            } else {
                return 100;
            }
        }
        return this._percent;
    }

    set percent(value: number) {
        this._percent = value;
    }

    /**
     * Determines whether the progress bar is actively updated or not
     * @type {boolean}
     */
    private _active: boolean = false;

    get active(): boolean {
        if (this.limcService instanceof LimcService) {
            return this.limcService.runningSubscriptions > 0;
        }
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    /////////////
    // METHODS //
    /////////////


    /**
     * Constructor.
     * @param limcService
     */
    constructor(private limcService?: LimcService) {}

    /**
     * Resets the current progress and disables the progress bar.
     */
    reset() {
        this.percent = 0;
        this.active = false;
    }

    /**
     * Sets the current progress.
     * @param {number} percent
     */
    setProgress(percent: number) {

        this.percent = percent;
        this.active = true;

        if (percent === 100) {
            timer(1000).subscribe(_ => this.reset());
        }
    }

}
