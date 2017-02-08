import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { JsonConvert } from "json2typescript"

import { Search } from "../apiresult/search";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";

@Injectable()
export class SalsahService {

    constructor(private http: Http) {
        JsonConvert.debugMode = false;
        JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL;
    }

    public searchString(searchString: string, nRows: number, startIndex: number): Observable<Search> {

        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("limc:limc-import"));

        return this.http
            .get("http://www.salsah.org/api/search/" + searchString + "?searchtype=fulltext&filter_by_project=LIMC&show_nrows=" + nRows + "&start_at=" + startIndex, {headers: headers})
            .map((response: Response) => {
                return JsonConvert.deserializeObject(response.json(), Search);
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw("");
            });

    }


    public getResourceById(id: string): Observable<Resource> {

        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("limc:limc-import"));

        return this.http
            .get("http://www.salsah.org/api/resources/" + id, {headers: headers})
            .map((response: Response) => {
                return JsonConvert.deserializeObject(response.json(), Resource);
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw("");
            });


    }

    public getGraphDataById(id: string): Observable<GraphData> {

        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("limc:limc-import"));

        return this.http
            .get("http://salsah.org/api/graphdata/" + id, {headers: headers})
            .map((response: Response) => {
                return JsonConvert.deserializeObject(response.json(), GraphData);
            })
            .catch((error: any) => {
                console.log(error);
                return Observable.throw("");
            });

    }

}