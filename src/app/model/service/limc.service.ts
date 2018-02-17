import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { SalsahService } from "./salsah.service";

import { Monument } from "../resources/monument";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { GoogleService } from "./google.service";
import { Museum } from "../resources/museum";

@Injectable()
/**
 * Uses the Salsah Service and maps results to LIMC objects.
 */
export class LimcService {

    ////////////////
    // PROPERTIES //
    ////////////////


    private static readonly resTypes: any = {
        MONUMENT: "limc:monument"
    }

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
     * Gets an instance of a Monument by a resource id.
     * @param resourceId
     * @returns {Observable<Monument>}
     */
    getMonumentByResourceId(resourceId: number): Observable<Monument> {

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

        return this.salsahService.getGraphData(resourceId).pipe(
            map((graphData: GraphData) => {

                const monuments: Monument[] = graphData.getMonuments();

                if (monuments.length !== 1) {
                    throw new ErrorObservable("More or less than 1 monument found.");
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

    findMonumentsByKeyword(keyword: string): Observable<Monument[]> {

        // First


    }

    private getResourcesFromKeyword(keyword: string): Observable<Resource> {

    }





}
