import { Injectable } from "@angular/core";

import { expand, map } from "rxjs/operators";
import { EMPTY, Observable, Subscription, throwError } from "rxjs/index";

import { SalsahService } from "./salsah.service";

import { Monument } from "../resources/monument";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";
import { GoogleService } from "./google.service";
import { Museum } from "../resources/museum";
import { ProgressBar } from "../other/progress-bar";
import { Search } from "../apiresult/search";
import { LimcSearch } from "../other/limc-search";

@Injectable()
/**
 * Uses the Salsah Service and maps results to LIMC objects.
 */
export class LimcService {

    ///////////////
    // CONSTANTS //
    ///////////////


    /**
     * The types
     * @type {{MONUMENT: string}}
     */
    private static readonly resTypes: any = {
        MONUMENT: "limc:monument"
    }


    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The progress bar
     */
    progressBar: ProgressBar = new ProgressBar();

    /**
     * the search result
     */
    search: LimcSearch = new LimcSearch();

    /**
     * List of all subscriptions
     */
    private subscriptions: Subscription[] = [];


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Constructor.
     * @param salsahService
     * @param googleService
     */
    constructor(private salsahService: SalsahService, private googleService: GoogleService) {}


    //////////////////
    // DATA METHODS //
    //////////////////

    /**
     * Gets an instance of a Monument by a resource id. Automatically adds all nested data.
     * @param resourceId
     * @returns {Observable<Monument>}
     */
    getMonumentByResourceId(resourceId: number): Observable<Monument> {

        this.progressBar.setProgress(0);

        return this.salsahService.getGraphData(resourceId).pipe(
            map((graphData: GraphData) => {

                this.progressBar.setProgress(50);

                const monuments: Monument[] = Monument.fromGraph(graphData.graph);

                if (monuments.length !== 1) {
                    this.progressBar.reset();
                    return throwError("More or less than 1 monument found.");
                }

                // Get the museum coordinates
                if (monuments[0].inventory) {
                    for (const inventory of monuments[0].inventory) {
                        this.fetchMuseumCoords(inventory.museum);
                    }
                }

                this.progressBar.setProgress(100);

                return monuments[0];

            })
        );

    }

    /**
     * Gets the coordinates of the museum.
     * @param {Museum} museum
     */
    private fetchMuseumCoords(museum: Museum) {

        this.googleService.getLatLon(museum.getAddress()).subscribe(
            (latlon: [number, number]) => {
                museum.latitude = latlon[0];
                museum.longitude = latlon[1];
            },
            (error: any) => {
                console.error(error);
            }
        );

    }

    /**
     * Tries to find monuments by a string.
     * @param keyword
     * @param startIndex
     * @param amount
     */
    searchMonuments(keyword: string, startIndex: number, amount?: number) {

        this.progressBar.setProgress(0);

        this.search.keyword = keyword;

        // Reset the search if necessary
        if (startIndex === 0) {
            this.search.monuments = []
            for (const sub of this.subscriptions) sub.unsubscribe();
        }

        if (amount === undefined) amount = 10;

        const s: Subscription = this.salsahService.getSearch(keyword, amount, startIndex).subscribe(
            (search: Search) => {

                this.progressBar.setProgress(50);

                this.search.result = search;

                // Loop through the results and do an appropriate action
                for (const subject of search.subjects) {

                    if (subject.iconLabel === "Monument") {
                        this.addMonumentByResourceId(subject.resourceId);
                    } else {
                        this.addMonumentsByResourceId(subject.resourceId);
                    }

                }

                this.progressBar.setProgress(100);

            },
            (error: any) => {
                this.progressBar.reset();
                console.error(error);
            }
        );

        this.subscriptions.push(s);

    }

    /**
     * Adds one monument to the array by its resource id.
     * This method makes sure the whole graph data is retreived, excluding the Google maps data.
     * @param {number} resourceId
     */
    private addMonumentByResourceId(resourceId: number) {

        const s: Subscription = this.salsahService.getGraphData(resourceId).subscribe(
            (graphData: GraphData) => {

                this.progressBar.percent++;

                const newMonuments: Monument[] = Monument.fromGraph(graphData.graph);

                if (newMonuments.length !== 1) {
                    return;
                }

                // Add the monument
                const monumentResourceIds: number[] = this.search.monuments.map(m => m.resourceId);
                if (monumentResourceIds.indexOf(resourceId) === -1) {
                    this.search.monuments.push(newMonuments[0]);
                }

            },
            (error: any) => {
                this.progressBar.reset();
                console.error(error);
            }
        );

        this.subscriptions.push(s);

    }

    /**
     * Adds all monuments that are linked to a given resource id.
     * @param {number} resourceId
     */
    private addMonumentsByResourceId(resourceId: number) {

        const s: Subscription = this.findMonumentResourceId(resourceId).subscribe(
            (monumentResourceId: number) => {
                if (monumentResourceId !== null) {
                    this.addMonumentByResourceId(monumentResourceId);
                }
            },
            (error: any) => {
                console.error(error);
            }
        )

        this.subscriptions.push(s);

    }

    /**
     * Finds monument resource ids from a given resource id.
     * This method works recursively and will always finish the search.
     * It works as follows when subscribed to:
     * - First it does the HTTP request (with salsahService.getResource)
     * - It enters the map() method and after that the expand() method
     * - The map method returns a resource id or null (in case a non-Monument resource was found)
     * - The expand method breaks the recursion when returning empty(), otherwise it continues
     * @param resourceId
     * @returns {Observable<number>}
     */
    private findMonumentResourceId(resourceId: number): Observable<number> {

        return this.salsahService.getResource(resourceId).pipe(
            expand((resource: any): Observable<number> => {

                if (resource instanceof Resource === false || resource.incoming.length === 0) {
                    return EMPTY;
                }

                for (const incoming of resource.incoming) {
                    return this.findMonumentResourceId(incoming.extResId.id);
                }

            }),
            map((resource: any): number => {

                if (resource instanceof Resource === false) {
                    return resource;
                } else if (resource.resdata.resTypeName === LimcService.resTypes.MONUMENT) {
                    return resource.resdata.resId;
                } else {
                    return null;
                }

            })
        );

    }

}
