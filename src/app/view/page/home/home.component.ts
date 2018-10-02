import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { LimcService } from "../../../model/service/limc.service";

import { Monument } from "../../../model/resources/monument";
import { Search } from "../../../model/apiresult/search";
import { LimcSearch } from "../../../model/other/limc-search";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
/**
 * The page gui.
 */
export class HomeComponent implements OnInit {

    ////////////////
    // PROPERTIES //
    ////////////////

    /**
     * The search string
     */
    searchString: string = "London";

    /**
     * The amount of entries to load per search
     */
    searchLimit: number = 12;


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

        /*
        if (this.searchService.monuments.length > 0) return;

        // Search again if necessary
        this.route.url.subscribe(
            (segment: UrlSegment[]) => {
                switch (segment.length) {
                    case 1:
                        this.search();
                        break;
                    case 2:
                        if (this.searchString === this.searchService.lastSearchString) return;
                        this.searchString = segment[1].path;
                        this.search();
                        break;
                    default:
                        break;
                }
            }
        );*/

    }

    /**
     * Opens a given monument.
     * @param monument
     */
    openMonument(monument: Monument) {
        this.limcService.search.selectedMonument = monument;
        this.router.navigate(["page", "monument", monument.resourceId]);
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

        const search: LimcSearch = this.limcService.search;

        console.log(search);

        if (search.result instanceof Search === false) return;

        const nextStartIndex: number = search.result.getNextStartIndex();

        console.log(nextStartIndex);

        if (nextStartIndex < 0) return;

        this.limcService.searchMonuments(search.keyword, nextStartIndex);

        console.log("search more");
        //this.searchService.searchMore(this.searchLimit);
    }

}
