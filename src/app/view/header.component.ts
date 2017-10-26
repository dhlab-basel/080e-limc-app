import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SearchService } from "../model/service/search.service";

import { ActivatedRoute, Router, UrlSegment } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
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


    constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) {
    }

    ngOnInit() {
        //this.searchString = this.searchList[Math.floor(Math.random() * this.searchList.length)];

        //this.search();
    }

    openHome() {
        this.router.navigate(["search"]);
    }

    search() {

        // Perform the search
        this.searchService.search(this.searchString, this.searchLimit, 0);
        this.openHome();

    }

}
