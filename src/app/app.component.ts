import { Component, OnInit } from '@angular/core';
import { SalsahService } from './model/service/salsah.service';

import 'rxjs';

import { JsonConvert } from "json2typescript";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SalsahService]
})
export class AppComponent implements OnInit {

    constructor(private salsahService: SalsahService) {

    }

    ngOnInit() {

        JsonConvert.debugMode = false;
        JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL;

    }
}
