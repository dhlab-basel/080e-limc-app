import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { SalsahService } from "./salsah.service";

import { Monument } from "../resources/monument";
import { Resource } from "../apiresult/resource";
import { Graph } from "../apiresult/graph";
import { GraphData } from "../apiresult/graph-data";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

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
     */
    constructor(private salsahService: SalsahService) {
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
                    console.error("");
                    throw new ErrorObservable("");
                }

                return monuments[0];

            })
        );


    }

    findMonumentsByKeyword(keyword: string): Observable<Monument[]> {



    }

}
