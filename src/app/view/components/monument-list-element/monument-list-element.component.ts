import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Monument } from "../../../model/resources/monument";
import { LimcService } from "../../../model/service/limc.service";

@Component({
    selector: "app-monument-list-element",
    templateUrl: "./monument-list-element.component.html",
    styleUrls: ["./monument-list-element.component.scss"]
})
export class MonumentListElementComponent implements OnInit {

    /**
     * Input array
     */
    @Input() monument: Monument;

    /**
     * Constructor.
     */
    constructor(private router: Router, private limcService: LimcService) {}

    /**
     * NgOnInit.
     */
    ngOnInit() {}

    /**
     * Opens a given monument.
     * @param monument
     */
    openMonument(monument: Monument) {
        this.limcService.search.selectedMonument = monument;
        this.router.navigate(["page", "monument", monument.resourceId]);
    }

}
