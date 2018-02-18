import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { expand, map } from "rxjs/operators";

import { SalsahService } from "./salsah.service";

import { Monument } from "../resources/monument";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { GoogleService } from "./google.service";
import { Museum } from "../resources/museum";
import { ProgressBar } from "../other/progress-bar";
import { timer } from "rxjs/observable/timer";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { of } from "rxjs/observable/of";
import { interval } from "rxjs/observable/interval";
import { Search } from "../apiresult/search";
import { LimcSearch } from "../other/limc-search";
import { Scene } from "../resources/scene";
import { ResourceIncoming } from "../apiresult/resource-incoming";
import { empty } from "rxjs/observable/empty";

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
     * @type {ProgressBar}
     */
    progressBar: ProgressBar = new ProgressBar();

    /**
     * the search result
     * @type {LimcSearch}
     */
    search: LimcSearch = new LimcSearch();


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Constructor.
     * @param salsahService
     * @param googleService
     */
    constructor(private salsahService: SalsahService, private googleService: GoogleService) {
    }


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
                    throw new ErrorObservable("More or less than 1 monument found.");
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

    searchMonuments(keyword: string) {

        this.progressBar.setProgress(0);

        this.salsahService.getSearch(keyword, 10, 0).subscribe(
            (search: Search) => {

                this.search.monuments = [];

                // Loop through the results and do an appropriate action
                for (const subject of search.subjects) {

                    switch (subject.iconLabel) {
                        case "Monument":
                            this.addMonumentByResourceId(subject.resourceId);
                            break;
                        case "Szene":
                        case "Catalog LIMC":
                            this.addMonumentsByResourceId(subject.resourceId);
                            break;
                        default:
                            console.error(subject);
                            break;
                    }

                }

            },
            (error: any) => {
                console.error(error);
            }
        );

        /*
         this.salsahService.getSearch(keyword, 10, 0).pipe(
         map(
         (search: Search) => {

         const monuments: Monument[] = [];

         // Loop through the results and do an appropriate action
         for (const subject of search.subjects) {

         if (subject.iconLabel === "Monument") {
         this.getMonumentByResourceId(subject.resourceId).subscribe(
         (monument: Monument) => {
         monuments.push(monument);
         },
         _ => {}
         );
         } else {
         console.error(subject);
         }

         }

         return monuments;

         }
         )
         );*/


    }

    private addMonumentByResourceId(resourceId: number) {

        this.salsahService.getGraphData(resourceId).subscribe(
            (graphData: GraphData) => {

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
                console.error(error);
            }
        );

    }


    /*
     return this.salsahService.getResource(resourceId).pipe(
     map((resource: Resource) => {
     if (resource.resinfo.resTypeName === LimcService.resTypes.MONUMENT) {
     return new Monument();
     } else {
     throw new TypeError();
     }
     })
     );*/


    private addMonumentsByResourceId(resourceId: number) {


        this.findMonumentResourceIds(resourceId).subscribe(
            (resourceIds: number[]) => {

                for (const r of resourceIds) {
                    this.addMonumentByResourceId(r);
                }
            },
            (error: any) => {
                console.error(error);
            }
        )

    }


    private findMonumentResourceIds(resourceId: number): Observable<number[]> {

        return this.salsahService.getResource(resourceId).pipe(
            expand((resource: Resource): Observable<number[]> => {

                console.log(resource);

                if (resource.incoming.length > 0) {

                    for (const incoming of resource.incoming) {
                        return this.findMonumentResourceIds(incoming.extResId.id);
                    }

                } else {
                    return of([resource.resdata.resId]);
                }
            }),
            map((resources: any): number[] => {
                console.log(resources);
                return resources;
                //return [resource.resdata.resId];
                //return resources.map(r => r.resdata.resId);
            })
        );

    }

}
