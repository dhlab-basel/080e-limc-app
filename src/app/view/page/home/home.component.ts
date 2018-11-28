import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { LimcService } from "../../../model/service/limc.service";
import { Search } from "../../../model/apiresult/search";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
/**
 * The page gui.
 */
export class HomeComponent implements OnInit {

    ///////////////
    // CONSTANTS //
    ///////////////

    
    /**
     * The amount of entries to load per search
     */
    readonly searchLimit: number = 3;


    ////////////////
    // PROPERTIES //
    ////////////////


    /////////////
    // METHODS //
    /////////////


    /**
     * Constructor.
     * @param router
     * @param route
     * @param limcService
     */
    constructor(private router: Router, private route: ActivatedRoute, public limcService: LimcService) {}

    /**
     * NgOnInit.
     */
    ngOnInit() {
        this.limcService.search.selectedMonument = null;
    }

    /**
     * Searches for more monuments.
     */
    searchMore() {

        if (this.limcService.search.result !== null) {
            if (this.limcService.search.result.hasMoreResults() === false) return;
        }

        this.limcService.searchMonuments(this.limcService.search.keyword, this.limcService.search.monuments.length, this.searchLimit);

    }

}
