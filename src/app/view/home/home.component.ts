import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { SearchService } from "../../model/service/search.service";

import { Monument } from "../../model/resources/monument";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
/**
 * The home gui.
 */
export class HomeComponent implements OnInit {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The amount of entries to load per search
     */
    searchLimit: number = 6;


    /////////////
    // METHODS //
    /////////////


    /**
     * Constructor.
     * @param router
     * @param searchService
     */
    constructor(private router: Router, private searchService: SearchService) {
    }

    /**
     * NgOnInit.
     */
    ngOnInit() {
    }

    /**
     * Opens a given monument.
     * @param monument
     */
    openMonument(monument: Monument) {
        this.router.navigate(["monument", monument.id]);
    }

    /**
     * Searches for more monuments.
     */
    searchMore() {
        this.searchService.searchMore(this.searchLimit);
    }

}
