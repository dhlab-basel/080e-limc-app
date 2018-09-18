import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs/index";

@Injectable()
/**
 * Uses the Salsah Service and maps results to LIMC objects.
 */
export class GoogleService {

    ////////////////
    // PROPERTIES //
    ////////////////


    private static readonly API_KEY: string = "AIzaSyCmedK-uMWOPLLYSpegtc-Lz3QjjjGUrLY";
    private static readonly API_URL: string = "https://maps.googleapis.com/maps/api";


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Constructor.
     * @param http
     */
    constructor(private http: HttpClient) {}


    //////////////////
    // DATA METHODS //
    //////////////////


    /**
     * Gets the lat-long coordinates as an array from any address.
     * @param {string} place
     * @returns {Observable<[number , number]>}
     */
    getLatLon(place: string): Observable<[number, number]> {

        return this.http.get(GoogleService.API_URL + "/geocode/json?key=" + GoogleService.API_KEY + "&address=" + place, {
            headers: {},
            observe: "response"
        }).pipe(
            map((response: HttpResponse<any>) => {

                const lat: number = response.body.results[0].geometry.location.lat;
                const lon: number = response.body.results[0].geometry.location.lng;

                return [lat, lon];

            }),
            catchError((error: any) => {
                return throwError(error);
            })
        )

    }




}
