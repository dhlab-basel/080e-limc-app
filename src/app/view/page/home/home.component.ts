import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";

import { SearchService } from "../../../model/service/search.service";

import { Monument } from "../../../model/resources/monument";
import { NgbProgressbarConfig } from "@ng-bootstrap/ng-bootstrap";

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
     * @param config
     * @param searchService
     */
    constructor(private router: Router, private route: ActivatedRoute, public config: NgbProgressbarConfig, public searchService: SearchService) {

        // customize default values of progress bars used by this component tree
        config.animated = true;


    }

    /**
     * NgOnInit.
     */
    ngOnInit() {

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
        );

    }

    /**
     * Opens a given monument.
     * @param monument
     */
    openMonument(monument: Monument) {
        this.router.navigate(["monument", monument.id]);
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
        //this.searchService.searchMore(this.searchLimit);
    }

}
