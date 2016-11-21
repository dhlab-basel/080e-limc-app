import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { Search } from "../../model/apiresult/search";
import { Monument } from "../../model/resources/monument";

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    @Input() monument: Monument;

    constructor() {
    }

    ngOnInit() {
    }

}
