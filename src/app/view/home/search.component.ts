import { Component, OnInit, EventEmitter } from '@angular/core';
import { SalsahService } from "../../model/service/salsah.service";
import { Search } from "../../model/apiresult/search";
import { Input, Output } from "@angular/core/src/metadata/directives";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    @Input() search: Search;
    @Output() onSearched: EventEmitter<Search> = new EventEmitter<Search>();

    constructor(private salsahService: SalsahService) {
    }

    ngOnInit() {
        this.doSearch("Attika");
    }

    doSearch(searchString: string) {
        console.log(searchString);
        this.salsahService.searchString(searchString, 9, 0).subscribe(
            (search: Search) => {
                console.log(search);
                this.search = search;
                this.search.getResources(this.salsahService);
                this.onSearched.emit(search);
            },
            (error: any) => { console.log('error');/*this.error = <any>error*/ },
            () => { }
        );
    }

}
