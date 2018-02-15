import { Injectable }     from "@angular/core";

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


    constructor(private salsahService: SalsahService) {}


    reset() {
        this.monuments = [];
        this.lastSearch = null;
        this.lastSearchString = "";
    }

    search(searchString: string, searchLimit: number, startIndex: number) {

        // Reset last search if necessary
        if (startIndex === 0) {
            this.reset();
        }

        this.lastSearchString = searchString;
        this.nextSearchStartIndex = startIndex + searchLimit;

        this.salsahService.searchString(searchString, searchLimit, startIndex).subscribe(
            (search: Search) => {

                console.log(search);

                // Save the resulting data
                this.lastSearch = search;

                if (this.lastSearch.subjects === undefined) return;

                for (const subject of this.lastSearch.subjects) {

                    this.salsahService.getGraphDataById(subject.obj_id)
                        .subscribe(
                            (graphData: GraphData) => {
                                const monuments: Monument[] = graphData.getMonuments();
                                this.monuments = this.monuments.concat(monuments);
                            },
                            (error: any) => {
                                console.error(error);
                            }
                        );

                }
            },
            (error: any) => {
                console.error(error);
            }
        );

    }

    searchMore(searchLimit: number) {
        this.search(this.lastSearchString, searchLimit, this.nextSearchStartIndex);
    }

}