import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.scss"]
})
/**
 * Footer gui.
 */
export class FooterComponent implements OnInit {

    /**
     * The current year
     */
    currentYear: number = 2017;

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * NgOnInit.
     */
    ngOnInit() {
        this.currentYear = (new Date()).getFullYear();
    }

}
