import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { Monument } from "../../model/resources/monument";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css'],
    providers: [NgbCarouselConfig]
})
export class SearchResultComponent implements OnInit {

    @Input() monument: Monument;

    constructor(config: NgbCarouselConfig) {
        config.interval = 2000;
    }

    ngOnInit() {
    }

}
