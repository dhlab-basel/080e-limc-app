import { Component, OnInit, EventEmitter } from '@angular/core';
import { SalsahService } from "../../model/service/salsah.service";
import { Search } from "../../model/apiresult/search";
import { Input, Output } from "@angular/core/src/metadata/directives";
import { GraphData } from "../../model/apiresult/graph-data";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    @Input() search: Search;
    @Output() onSearched: EventEmitter<Search> = new EventEmitter<Search>();

    private searchList = ["Roma", "Atikka", "Wandmalerei", "Basel", "Athens"];

    constructor(private salsahService: SalsahService) {
    }

    ngOnInit() {
        this.doSearch(this.searchList[Math.floor(Math.random() * this.searchList.length)]);
    }

    public doSearch(searchString: string) {
        console.log(searchString);
        this.salsahService.searchString(searchString, 12, 0).subscribe(
            (search: Search) => {
                console.log(search);
                this.search = search;

                if (this.search.subjects === undefined) return;

                for (let subject of this.search.subjects) {

                    this.salsahService.getGraphDataById(subject.obj_id)
                        .subscribe(
                            (graphData: GraphData) => {
                                console.log(graphData);
                                this.search.monuments = this.search.monuments.concat(graphData.getMonuments());
                            },
                            (error: any) => { console.log('error');/*this.error = <any>error*/ },
                            () => { }
                        );

                }


                //this.search.getResources(this.salsahService);
                this.onSearched.emit(search);
            },
            (error: any) => { console.log('error');/*this.error = <any>error*/ },
            () => { }
        );
    }



}
