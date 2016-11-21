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

    public doSearch(searchString: string) {
        console.log(searchString);
        this.salsahService.searchString(searchString, 1, 0).subscribe(
            (search: Search) => {
                console.log(search);
                this.search = search;

                if (this.search.subjects === undefined) return;

                for (let subject of this.search.subjects) {
                    subject.getGraph(this.salsahService);
                }


                //this.search.getResources(this.salsahService);
                this.onSearched.emit(search);
            },
            (error: any) => { console.log('error');/*this.error = <any>error*/ },
            () => { }
        );
    }



}
