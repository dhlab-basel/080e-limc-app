import {Component, OnInit} from '@angular/core';
import {SalsahService} from './salsah.service';

import 'rxjs';

import {Monument} from "./resources/monument";
import {UserData} from "./user-data";
import {JsonConvert} from "./json-convert";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SalsahService]
})
export class AppComponent implements OnInit {

    title = 'app works well !';

    monument:Monument;
    error:string;


    constructor(private salsahService: SalsahService) {

    }

    ngOnInit() {

        let jsonData = '{ "blub": ["bub","buub"], "blab": "bab", "blob": "bob", "user": { "name": "Andreas" } }';

        //try {
            let obj = JsonConvert.deserializeObject<UserData>(UserData, JSON.parse(jsonData));
        //} catch (e) {
            //console.log((<Error>e));//conversion to Error type
        //}
        /*new UserData();


        //console.log(json.userdata);

        console.log("Starting Logging");
        let data = new UserData();
        Object.keys(data).forEach((key) => {

            console.log(key);
        });

        console.log(Object.prototype);*/



        /*
        this.salsahService.getResourceById(2126046).subscribe(
            (monument: Monument) => { this.monument = monument; },
            (error: any) => { console.log('error'); this.error = <any>error },
            () => { }
        );*/
    }
}
