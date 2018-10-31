import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { LimcService } from "../../../model/service/limc.service";

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


    /**
     * The search string
     */
    searchString: string = "London";


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
     * Performs a basic search
     */
    search() {
        //this.searchService.search(this.searchString, this.searchLimit, 0);
    }

    /**
     * Searches for more monuments.
     */
    searchMore() {

        this.limcService.searchMonuments(this.limcService.search.keyword, this.limcService.search.monuments.length, this.searchLimit);

        /*

        const search: LimcSearch = this.limcService.search;

        console.log(search);

        if (search.result instanceof Search === false) return;

        const nextStartIndex: number = search.result.getNextStartIndex();

        console.log(nextStartIndex);

        if (nextStartIndex < 0) return;

        this.limcService.searchMonuments(search.keyword, nextStartIndex);

        console.log("search more");
        //this.searchService.searchMore(this.searchLimit);
        */

    }

}
