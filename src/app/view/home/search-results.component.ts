import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { Search } from "../../model/apiresult/search";
import { SalsahService } from "../../model/service/salsah.service";
import { SearchService } from "../../model/service/search.service";

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.css'],
    providers: [SalsahService]
})
export class SearchResultsComponent implements OnInit {

    @Input() search: Search;

    constructor(private salsahService: SalsahService, public searchService: SearchService) {
    }

    ngOnInit() {

    }

}
