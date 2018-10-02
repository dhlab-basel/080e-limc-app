import { Component, OnInit } from '@angular/core';

import { LimcService } from "../../../model/service/limc.service";

@Component({
    selector: 'app-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
/**
 * Extended search page.
 */
export class ExtendedSearchComponent implements OnInit {

    ///////////////
    // CONSTANTS //
    ///////////////



    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * Search properties
     * @type {Array}
     */
    searchProperties: { id: number, name: string }[] = [
        { id: 1, name: "Name" },
        { id: 2, name: "City" },
    ];




    /////////////
    // METHODS //
    /////////////

    constructor(public limcService: LimcService) {
    }

    ngOnInit() {
    }


    /////////////
    // METHODS //
    /////////////


    addProperty(ev) {
        console.log(ev);
    }


}
