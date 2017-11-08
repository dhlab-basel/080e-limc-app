import { EventEmitter, Injectable } from '@angular/core';

import { SalsahService } from "./salsah.service";

import { Monument } from "../resources/monument";
import { Search } from "../apiresult/search";
import { GraphData } from "../apiresult/graph-data";

@Injectable()
/**
 * The Search service for internal use.
 */
export class SearchService {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * Event that fires when a search starts
     * @type {EventEmitter<boolean>}
     */
    searchStarted: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Event that fires when we can announce progress
     */
    searchProgress: EventEmitter<number> = new EventEmitter<number>();

    /**
     * Event that fires when a search finishes
     */
    searchFinished: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * The current search result
     */
    monuments: Monument[] = [];

    /**
     * The last search
     */
    lastSearch: Search = null;

    /**
     * The last search string
     */
    lastSearchString: string = "";

    /**
     * the start index for the next search
     */
    nextSearchStartIndex: number = 0;


    /////////////
    // METHODS //
    /////////////


    constructor(private salsahService: SalsahService) {
    }


    reset() {
        this.monuments = [];
        this.lastSearch = null;
        this.lastSearchString = "";
    }

    search(searchString: string, searchLimit: number, startIndex: number) {

        this.searchStarted.emit();

        // Reset last search if necessary
        if (startIndex === 0) {
            this.reset();
        }

        this.lastSearchString = searchString;
        this.nextSearchStartIndex = startIndex + searchLimit;

        this.salsahService.searchString(searchString, searchLimit, startIndex).subscribe(
            (search: Search) => {

                // Save the resulting data
                this.lastSearch = search;

                if (this.lastSearch.subjects === undefined) return;

                let i: number = 0;
                //console.log(searchLimit);

                for (let subject of this.lastSearch.subjects) {
                    i++;
                    //console.log(i);

                    this.salsahService.getGraphDataById(subject.obj_id)
                        .subscribe(
                            (graphData: GraphData) => {
                                console.log(graphData);
                                let monuments: Monument[] = graphData.getMonuments();
                                this.monuments = this.monuments.concat(monuments);
                                this.searchFinished.emit(monuments.length > 0);
                            },
                            (error: any) => {
                            }
                        );

                }
            },
            (error: any) => {
            }
        );

    }

    searchMore(searchLimit: number) {
        this.search(this.lastSearchString, searchLimit, this.nextSearchStartIndex);
    }

}