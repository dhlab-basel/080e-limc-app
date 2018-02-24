import { Component, Input, OnInit } from "@angular/core";

import { SearchService } from "../../model/service/search.service";

import { ActivatedRoute, Params, Router } from "@angular/router";
import { LimcService } from "../../model/service/limc.service";
import { Monument } from "../../model/resources/monument";
import { TranslateService } from "@ngx-translate/core";
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


    /////////////
    // METHODS //
    /////////////


    constructor(private router: Router, private translateService: TranslateService, private localStorageService: LocalStorageService, public limcService: LimcService) {
    }

    /**
     * NgOnInit.
     */
    ngOnInit() {

        const keyword: string = (
            this.router.url.startsWith("/page/search") ?
            this.router.url.replace("/page/search", "").replace("/", "") :
            ""
        );

        if (this.keyword !== keyword) {
            this.keyword = keyword;
            this.search(false);
        }

    }

    /**
     * Opens the search page.
     */
    openHome() {
        this.router.navigate(["page", "search", this.keyword]);
    }

    /**
     * Performs a new search.
     * @param {boolean} navigate
     */
    search(navigate?: boolean) {

        this.limcService.searchMonuments(this.keyword, 0);

        if (navigate) {
            this.router.navigate(["page", "search", this.keyword]);
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
