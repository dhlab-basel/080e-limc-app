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




/*


    getResourceById(id: number): Observable<Monument> {
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa("limc:limc-import"));
        return this.http
            .get("http://www.salsah.org/api/resources/" + id, {headers: headers})
            .map(this.saveMonument)
            .catch(this.test3);
    }


    private saveMonument(response: Response) {


        let json: any = response.json();

        let monument = new Monument();
        monument.bibliography = json["props"]["limc:bibliography"]["values"][0];

        //let monument = <Monument> json.props;

        return monument;
    }






    test(): Observable<any[]> {
        console.log('here');
        return this.http
            .get('http://www.salsah.org/api/resources/1910970')
            .map(this.test2)
            .catch(this.test3);
    }

    private test2(response: Response) {
        return response.json() || {};
    }

    private test3(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }*/

}