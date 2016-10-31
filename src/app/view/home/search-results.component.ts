import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { Search } from "../../model/apiresult/search";
import { SalsahService } from "../../model/service/salsah.service";

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

    @Input() search: Search;

    constructor(private salsahService: SalsahService) {
    }

    ngOnInit() {

    }

}
