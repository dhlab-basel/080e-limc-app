import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './view/home/search.component';
import { SearchResultComponent } from './view/home/search-result.component';
import { SearchResultsComponent } from './view/home/search-results.component';
import { DetailsComponent } from './view/details/details.component';
import { HomeComponent } from './view/home/home.component';

import { AppRoutingModule } from "./app-routing.module";

import { SalsahService } from "./model/service/salsah.service";

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchResultComponent,
        SearchResultsComponent,
        DetailsComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [SalsahService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
