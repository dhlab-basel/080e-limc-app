import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { LimcService } from "../../../model/service/limc.service";
import { Monument } from "../../../model/resources/monument";

@Component({
    selector: "app-monument-list",
    templateUrl: "./monument-list.component.html",
    styleUrls: ["./monument-list.component.scss"]
})
export class MonumentListComponent implements OnInit {

    /**
     * Input array
     */
    @Input() monuments: Monument[] = [];

    /**
     * Determines whether there are more results
     */
    @Input() hasMoreResults: boolean = true;

    /**
     * Output event
     */
    @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor.
     * @param limcService
     */
    constructor(public limcService: LimcService) {}

    /**
     * NgOnInit.
     */
    ngOnInit() {}

    /**
     * Called when the user reaches the bottom of the page.
     */
    onScrolled() {
        if (this.hasMoreResults) {
            this.loadMore.emit();
        }
    }

}
