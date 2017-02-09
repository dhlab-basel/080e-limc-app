import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from "./app-routing.module";

import { SearchService } from "./model/service/search.service";

import { AppComponent } from './app.component';
import { DetailsComponent } from './view/details/details.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './view/header.component';
import { FooterComponent } from './view/footer.component';
import { SalsahService } from "./model/service/salsah.service";
import { PhotoModalComponent } from './view/details/photo-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        DetailsComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        PhotoModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        NgbModule.forRoot()
    ],
    providers: [SalsahService, SearchService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
