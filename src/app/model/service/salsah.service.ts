import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"

import { Search } from "../apiresult/search";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";

@Injectable()
/**
 * Holds all Salsah API requests.
 */
export class SalsahService {

    ////////////////
    // PROPERTIES //
    ////////////////


    private static readonly apiUrl: string = "http://www.salsah.org/api";

    /**
     * JsonConvert instance
     * @type {JsonConvert}
     */
    jsonConvert: JsonConvert = new JsonConvert();


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Constructor.
     * @param http
     */
    constructor(private http: HttpClient) {
        this.jsonConvert.operationMode = OperationMode.ENABLE;
        this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    }


    //////////////////
    // DATA METHODS //
    //////////////////


    /**
     * Gets a resource by its numeric id.
     * @param resourceId
     * @returns {Observable<Resource>}
     */
    getResource(resourceId: number): Observable<Resource> {

        return this.http.get(SalsahService.apiUrl + "/resources/" + resourceId, {
            headers: {},
            observe: "response"
        }).pipe(
            map((response: HttpResponse<any>) => {
                return this.jsonConvert.deserializeObject(response.body, Resource);
            }),
            catchError((error: any) => {
                console.error(error);
                return ErrorObservable.create(error);
            })
        );

    }

    /**
     * Gets graph data by a resource id.
     * @param resourceId
     * @returns {Observable<R>}
     */
    public getGraphData(resourceId: number): Observable<GraphData> {

        return this.http.get(SalsahService.apiUrl + "/graphdata/" + resourceId + "?full=1", {
            headers: {},
            observe: "response"
        }).pipe(
            map((response: HttpResponse<any>) => {
                return this.jsonConvert.deserializeObject(response.body, GraphData);
            }),
            catchError((error: any) => {
                console.error(error);
                return ErrorObservable.create(error);
            })
        );

    }

    /**
     * Makes a full text search.
     * @param searchString
     * @param nRows
     * @param startIndex
     * @returns {Observable<R>}
     */
    public getSearch(searchString: string, nRows: number, startIndex: number): Observable<Search> {

        return this.http.get(SalsahService.apiUrl + "/search/" + searchString + "?searchtype=fulltext&filter_by_project=LIMC&show_nrows=" + nRows + "&start_at=" + startIndex, {
            headers: {},
            observe: "response"
        }).pipe(
            map((response: HttpResponse<any>) => {
                return this.jsonConvert.deserializeObject(response.body, Search);
            }),
            catchError((error: any) => {
                console.error(error);
                return ErrorObservable.create(error);
            })
        );

    }

}
