import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "./model/service/local-storage.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
/**
 * The main component.
 */
export class AppComponent implements OnInit {

    /**
     * Constructor.
     * @param translateService
     * @param localStorageService
     */
    constructor(private translateService: TranslateService, private localStorageService: LocalStorageService) {}

    /**
     * NgOnInit.
     */
    ngOnInit() {

        // Set default
        this.translateService.setDefaultLang("en");

        // Get current lang
        const lang: string = this.localStorageService.read("lang", "");
        if (lang !== "") {
            this.translateService.use(lang);
        } else {
            this.translateService.use("en");
        }

    }

}
