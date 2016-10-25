import { Component, OnInit } from '@angular/core';
import { SalsahService } from "../../model/service/salsah.service";
import { Search } from "../../model/apiresult/search";
import { Input } from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SalsahService]
})
export class SearchComponent implements OnInit {

    @Input() search: Search;

    constructor(private salsahService: SalsahService) {
    }

    ngOnInit() {
        this.doSearch("Attika");
    }

    doSearch(searchString: string) {
        console.log(searchString);
        this.salsahService.searchString(searchString, 10, 0).subscribe(
            (search: Search) => { console.log(search); this.search = search; },
            (error: any) => { console.log('error');/*this.error = <any>error*/ },
            () => { }
        );
    }

}
