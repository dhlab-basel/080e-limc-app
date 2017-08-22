import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript"

import { Search } from "../apiresult/search";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";

@Injectable()
/**
 * Holds all Salsah API requests.
 */
export class SalsahService {

    /**
     * JsonConvert instance
     * @type {JsonConvert}
     */
    jsonConvert: JsonConvert = new JsonConvert();

    /**
     * Constructor.
     * @param http
     */
    constructor(private http: Http) {
        this.jsonConvert.operationMode = OperationMode.ENABLE;
        this.jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    }

    /**
     * Makes a full text search.
     * @param searchString
     * @param nRows
     * @param startIndex
     * @returns {Observable<R>}
     */
    public searchString(searchString: string, nRows: number, startIndex: number): Observable<Search> {

        return this.http
            .get("http://www.salsah.org/api/search/" + searchString + "?searchtype=fulltext&filter_by_project=LIMC&show_nrows=" + nRows + "&start_at=" + startIndex)
            .map((response: Response) => {
                return this.jsonConvert.deserializeObject(response.json(), Search);
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw("");
            });

    }

    /**
     * Gets a resource by its id.
     * @param id
     * @returns {Observable<R>}
     */
    public getResourceById(id: string): Observable<Resource> {

        return this.http
            .get("http://www.salsah.org/api/resources/" + id)
            .map((response: Response) => {
                try {
                    return this.jsonConvert.deserializeObject(response.json(), Resource);
                } catch (e) {
                    console.log(e);
                    return null;
                }
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw("");
            });


    }

    /**
     * Gets graph data by a resource id.
     * @param id
     * @returns {Observable<R>}
     */
    public getGraphDataById(id: string): Observable<GraphData> {

        return this.http
            .get("http://salsah.org/api/graphdata/" + id + "?full=1")
            .map((response: Response) => {
                return this.jsonConvert.deserializeObject(response.json(), GraphData);
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw("");
            });

    }

}