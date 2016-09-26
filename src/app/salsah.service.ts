import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }     from 'rxjs';
import {Monument} from "./resources/monument";

@Injectable()
export class SalsahService {

    constructor(private http: Http) {

    }

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
    }

}