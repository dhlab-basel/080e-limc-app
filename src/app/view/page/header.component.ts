import { Component, Input, OnInit } from "@angular/core";

import { SearchService } from "../../model/service/search.service";

import { ActivatedRoute, Router } from "@angular/router";
import { LimcService } from "../../model/service/limc.service";
import { Monument } from "../../model/resources/monument";

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


    constructor(private router: Router, private route: ActivatedRoute, public limcService: LimcService) {
    }

    ngOnInit() {
        this.keyword = "Zeus";
        this.search();

/*
        this.limcService.findMonumentsByKeyword("Attika").subscribe(
            (monuments: Monument[]) => {
                console.log(monuments);
            },
            (error: any) => {
                console.error(error);
            }
        );*/

    }

    openHome() {
        //this.router.navigate(["page", this.searchString]);
    }

    search() {
        this.limcService.searchMonuments(this.keyword);

        //this.searchService.search(this.searchString, this.searchLimit, 0);
        //this.router.navigate(["page", this.searchString]);
    }

}
