import { Component, OnInit } from '@angular/core';
import { Search } from "../../model/apiresult/search";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public search: Search = null;

    constructor() {
    }

    ngOnInit() {
    }

}
