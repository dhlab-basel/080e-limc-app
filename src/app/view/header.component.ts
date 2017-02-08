import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SalsahService } from "../model/service/salsah.service";
import { SearchService } from "../model/service/search.service";

import { Search } from "../model/apiresult/search";
import { GraphData } from "../model/apiresult/graph-data";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [SalsahService]
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


    //@Input() search: Search;
    //@Output() onSearched: EventEmitter<Search> = new EventEmitter<Search>();

    private searchList = ["Roma", "Atikka", "Wandmalerei", "Basel", "Athens"];

    constructor(private router: Router, private salsahService: SalsahService, private searchService: SearchService) {
    }

    ngOnInit() {
        this.searchString = this.searchList[Math.floor(Math.random() * this.searchList.length)];
        this.search();
    }

    resetSearch() {
        this.searchString = "";
        this.searchService.search = null;
        this.router.navigate(["search"]);
    }

    search() {
        let searchString = this.searchString;
        //console.log(searchString);
        this.salsahService.searchString(searchString, 12, 0).subscribe(
            (search: Search) => {
                console.log(search);
                this.searchService.search = search;

                if (this.searchService.search.subjects === undefined) return;

                for (let subject of this.searchService.search.subjects) {

                    this.salsahService.getGraphDataById(subject.obj_id)
                        .subscribe(
                            (graphData: GraphData) => {
                                console.log(graphData);
                                this.searchService.search.monuments = this.searchService.search.monuments.concat(graphData.getMonuments());
                            },
                            (error: any) => { console.log('error');/*this.error = <any>error****/ },
                            () => { }
                        );

                }


                //this.search.getResources(this.salsahService);
                //this.onSearched.emit(search);
            },
            (error: any) => { console.log('error');/*this.error = <any>error*/ },
            () => { }
        );
    }

}
