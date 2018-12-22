import { Injectable } from "@angular/core";

import { expand, map } from "rxjs/operators";
import { EMPTY, forkJoin, Observable, Subscription, throwError } from "rxjs";

import { SalsahService } from "./salsah.service";

import { Monument } from "../resources/monument";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";
import { GoogleService } from "./google.service";
import { Museum } from "../resources/museum";
import { Search } from "../apiresult/search";
import { LimcSearch } from "../other/limc-search";
import { LimcExtendedSearch } from "../other/limc-extended-search";

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
     */
    private static readonly resTypes: any = {
        MONUMENT: "limc:monument"
    };


    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The search result
     */
    search: LimcSearch = new LimcSearch();

    /**
     * The search result
     */
    extendedSearch: LimcExtendedSearch = new LimcExtendedSearch();

    /**
     * List of all subscriptions
     */
    subscriptions: Subscription[] = [];

    /**
     * Amount of active subscriptions
     */
    get runningSubscriptions(): number {
        return this.subscriptions.filter(s => s.closed === false).length;
    }


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
    getMonumentByResourceId(resourceId: number): Observable<Monument | any> {

        return this.salsahService.getGraphData(resourceId).pipe(
            map((graphData: GraphData) => {

                const monuments: Monument[] = Monument.fromGraph(graphData.graph);

                if (monuments.length !== 1) {
                    return throwError("More or less than 1 monument found.");
                }

                // Get the museum coordinates
                if (monuments[0].inventory) {
                    for (const inventory of monuments[0].inventory) {
                        this.fetchMuseumCoords(inventory.museum);
                    }
                }

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
    searchMonuments(keyword: string, startIndex: number, amount: number) {

        this.search.keyword = keyword;

        // Reset the search if necessary
        if (startIndex === 0) {
            this.search.monuments = [];
            for (let i = 0; i < this.subscriptions.length; i++) {
                this.subscriptions[i].unsubscribe();
                this.subscriptions.splice(i--, 1);
            }
        }

        const s: Subscription = this.salsahService.getSearch(keyword, amount, startIndex).subscribe(
            (search: Search) => {

                this.search.result = search;

                // Loop through the results and do an appropriate action
                const resourceIds: number[] = [];
                for (const subject of search.subjects) {

                    if (resourceIds.indexOf(subject.resourceId) >= 0) continue;

                    if (subject.iconLabel === "Monument") {
                        this.addMonumentByResourceId(this.search.monuments, subject.resourceId);
                    } else {
                        this.addMonumentsByResourceId(this.search.monuments, subject.resourceId);
                    }

                    // Remember the traversed resource ids so we do not make duplicate requests
                    resourceIds.push(subject.resourceId);

                }

            },
            (error: any) => {
                console.error(error);
            }
        );

        this.subscriptions.push(s);

    }

    /**
     * Searches monuments by given data.
     * @param data
     * @param amount
     * @param reset
     */
    searchMonumentsByProperties(data: { resourceTypeId: number, propertyId: number, value: number|string }[], amount: number, reset?: boolean) {

        if (data.length === 0) return;

        // Reset the search if necessary
        if (reset) {
            this.extendedSearch.reset();
            for (const sub of this.subscriptions) sub.unsubscribe();
        }

        // Set the current index
        const startIndex: number = this.extendedSearch.results.length;

        // Search for the monuments of the given resource type id
        this.searchMonumentsByResourceProperties(0, data[0].resourceTypeId, data, startIndex, amount);

        /*

        // Now break up the search data into resources
        const resourceTypeIds: number[] = Array.from(new Set(data.map(d => d.resourceTypeId)));
        if (resourceTypeIds.length === 0) return;

        // Set a timer
        const resultWatcher: Observable<number> = interval(100);
        const s: Subscription = resultWatcher.subscribe(
            (number: number) => {

                // If there are running subscriptions, do NOT continue to make requests
                if (this.runningSubscriptions > 0) return;

                // Check for condition that should end the watcher and stop continuing requests
                if (this.extendedSearch.monuments.length >= startIndex + amount) {
                    console.log("enough!");
                    s.unsubscribe();
                    return;
                } else {
                    console.log("NOT ENOUGH")
                }

                if (this.extendedSearch.results.length > 0 && this.extendedSearch.results.filter(s => s.hasMoreResults()).length === 0) {
                    s.unsubscribe();
                    return;
                }

                console.log("1");

                // Otherwise make new requests
                let i = 0;
                for (const resourceTypeId of resourceTypeIds) {

                    // Now restrict the data to this resource type id
                    const restrictedData: { resourceTypeId: number, propertyId: number, value: number|string }[] = data.filter(d => d.resourceTypeId === resourceTypeId);

                    // Perform a search for all properties of this resource tpye id
                    if (this.extendedSearch.results[i] instanceof Search) {
                        const tempStartIndex: number = this.extendedSearch.results[i].getNextStartIndex();
                        if (tempStartIndex === -1) continue;
                        console.log(this.extendedSearch.results[i]);
                        console.log("START INDEX = " + tempStartIndex);
                        this.searchMonumentsByResourceProperties(i, resourceTypeId, restrictedData, tempStartIndex, amount);
                    } else {
                        this.searchMonumentsByResourceProperties(i, resourceTypeId, restrictedData, 0, amount);
                    }

                    i++;

                }

            }
        );

        */

    }

    /**
     * Searches monuments by given data.
     * @param index
     * @param resourceTypeId
     * @param data
     * @param startIndex
     * @param amount
     */
    searchMonumentsByResourceProperties(index: number, resourceTypeId: number, data: { propertyId: number, value: number|string }[], startIndex: number, amount?: number) {

        if (startIndex === 0) this.extendedSearch.resultingMonuments[index] = [];

        const searchParams: string = data.map(
            (p: any) => {
                if (typeof p.value === "string" && p.value.indexOf("%") >= 0) {
                    return "filter_by_restype=" + resourceTypeId + "&property_id[]=" + p.propertyId + "&compop[]=LIKE&searchval[]=" + p.value + ""
                } else {
                    return "filter_by_restype=" + resourceTypeId + "&property_id[]=" + p.propertyId + "&compop[]=EQ&searchval[]=" + p.value + ""
                }
            }
        ).join("&");

        const s: Subscription = this.salsahService.getExtendedSearch(searchParams, amount, startIndex).subscribe(
            (search: Search) => {

                this.extendedSearch.results[index] = search;

                // Loop through the results and do an appropriate action
                for (const subject of search.subjects) {

                    if (subject.iconLabel === "Monument") {
                        this.addMonumentByResourceId(this.extendedSearch.resultingMonuments[index], subject.resourceId);
                    } else {
                        this.addMonumentsByResourceId(this.extendedSearch.resultingMonuments[index], subject.resourceId);
                    }

                }

            },
            (error: any) => {
                console.error(error);
            }
        );

        this.subscriptions.push(s);

    }

    /**
     * Adds one monument to the array by its resource id.
     * This method makes sure the whole graph data is retreived, excluding the Google maps data.
     * @param monuments
     * @param resourceId
     */
    private addMonumentByResourceId(monuments: Monument[], resourceId: number) {

        const s: Subscription = this.salsahService.getGraphData(resourceId).subscribe(
            (graphData: GraphData) => {

                const newMonuments: Monument[] = Monument.fromGraph(graphData.graph);

                if (newMonuments.length !== 1) {
                    return;
                }

                // Add the monument
                const monumentResourceIds: number[] = monuments.map(m => m.resourceId);
                if (monumentResourceIds.indexOf(resourceId) === -1) {
                    monuments.push(newMonuments[0]);
                    newMonuments[0].fetchFirstPhoto(this.salsahService);
                }

            },
            (error: any) => {
                console.error(error);
            }
        );

        this.subscriptions.push(s);

    }

    /**
     * Adds all monuments that are linked to a given resource id.
     * @param monuments
     * @param resourceId
     */
    private addMonumentsByResourceId(monuments: Monument[], resourceId: number) {

        const s: Subscription = this.findMonumentResourceId(resourceId).subscribe(
            (monumentResourceIds: number[]) => {
                if (monumentResourceIds === null) return;
                for (const monumentResourceId of monumentResourceIds) {
                    this.addMonumentByResourceId(monuments, monumentResourceId);
                }
            },
            (error: any) => {
                console.error(error);
            }
        );

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
     * @returns
     */
    private findMonumentResourceId(resourceId: number): Observable<number[]> {

        return this.salsahService.getResource(resourceId).pipe(
            expand((resource: any): Observable<number[]> => {

                if (resource instanceof Resource === false || resource.incoming.length === 0) {
                    return EMPTY;
                }

                // Go through all incoming resource ids and recursively search for monuments
                const observables: Observable<number[]>[] = [];
                for (const incoming of resource.incoming) {
                    observables.push(this.findMonumentResourceId(incoming.extResId.id));
                }

                // Make sure we return a flat number array (not array of arrays)
                return forkJoin(observables).pipe(
                    map(
                    (array: any): number[] => {
                        let newArray: number[] = [];
                        for (const n of array) {
                            newArray = newArray.concat(n);
                        }
                        return newArray;
                    })
                );

            }),
            map((resource: any): number[] => {

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
