import {Component, OnInit} from '@angular/core';
import {SalsahService} from './salsah.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {Monument} from "./resources/monument";

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
        this.salsahService.getResourceById(2126046).subscribe(
            monument => { this.monument = monument; },
            error => {console.log('error'); this.error = <any>error }
        );
    }
}
