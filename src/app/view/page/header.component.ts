import { Component, Input, OnInit } from "@angular/core";

import { SearchService } from "../../model/service/search.service";

import { ActivatedRoute, Router } from "@angular/router";

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

    ngOnInit() {}

    openHome() {
        this.router.navigate(["page", this.searchString]);
    }

    search() {
        //this.searchService.search(this.searchString, this.searchLimit, 0);
        this.router.navigate(["page", this.searchString]);
    }

}
