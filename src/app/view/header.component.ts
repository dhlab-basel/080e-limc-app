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
    searchString: string = "";

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
        console.log(this.router.url);
        //this.searchString = this.searchList[Math.floor(Math.random() * this.searchList.length)];

        //this.search();
    }

    openHome() {
        this.router.navigate(["search", this.searchString]);
    }

    search() {
        this.searchService.search(this.searchString, this.searchLimit, 0);
        this.router.navigate(["search", this.searchString]);
    }

}
