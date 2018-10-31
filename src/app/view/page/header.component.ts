import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { TranslateService } from "@ngx-translate/core";

import { LimcService } from "../../model/service/limc.service";
import { LocalStorageService } from "../../model/service/local-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    providers: []
})
/**
 * Header gui.
 */
export class HeaderComponent implements OnInit {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * Determines whether the search is shown or not.
     */
    @Input() showSearch: boolean = true;

    /**
     * The search string
     * @type {string}
     */
    keyword: string = "";

    /**
     * Limit of results
     */
    readonly searchLimit = 3;


    /////////////
    // METHODS //
    /////////////


    /**
     * Constructor.
     * @param router
     * @param translateService
     * @param localStorageService
     * @param limcService
     */
    constructor(private router: Router, public translateService: TranslateService, private localStorageService: LocalStorageService, public limcService: LimcService) {
    }

    /**
     * NgOnInit.
     */
    ngOnInit() {

        const keyword: string = (
            this.router.url.startsWith("/page/home") ?
            this.router.url.replace("/page/home", "").replace("/", "") :
            ""
        );

        if (this.keyword !== keyword) {
            this.keyword = keyword;
            this.search(false);
        }

    }

    /**
     * Opens the home page.
     */
    openHome() {
        this.router.navigate(["page", "home", this.keyword]);
    }

    /**
     * Performs a new search.
     * @param {boolean} navigate
     */
    search(navigate?: boolean) {

        this.limcService.searchMonuments(this.keyword, 0, this.searchLimit);

        if (navigate) {
            this.router.navigate(["page", "home", this.keyword]);
        }

    }

    /**
     * Changes the user language.
     * @param {string} languageString
     */
    changeLanguage(languageString: string) {

        // Change and save language
        this.translateService.use(languageString);
        this.localStorageService.write("lang", languageString);

        // Perform new search
        // this.search(true);

    }

}
