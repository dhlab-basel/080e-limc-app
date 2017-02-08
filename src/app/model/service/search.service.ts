import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { JsonConvert } from "json2typescript"

import { Search } from "../apiresult/search";
import { Resource } from "../apiresult/resource";
import { GraphData } from "../apiresult/graph-data";

@Injectable()
/**
 * The Search service for internal use.
 */
export class SearchService {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The current search result
     */
    search: Search = null;


    /////////////
    // METHODS //
    /////////////


    constructor() {
    }

}