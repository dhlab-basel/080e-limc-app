import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {

    /**
     * The current year
     */
    currentYear: number = 2017;

    /**
     *
     * @param {Router} router
     */
    constructor(private router: Router) { }

    /**
     * NgOnInit.
     */
    ngOnInit() {
        this.currentYear = (new Date()).getFullYear();
    }

    /**
     * Open the page page.
     */
    openHome() {
        this.router.navigate(["page", "home", "Basel"]);
    }

}
