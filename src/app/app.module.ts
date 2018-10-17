import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";

import { SalsahService } from "./model/service/salsah.service";
import { LimcService } from "./model/service/limc.service";
import { GoogleService } from "./model/service/google.service";
import { LocalStorageService } from "./model/service/local-storage.service";

import { AppComponent } from "./app.component";
import { MonumentComponent } from "./view/page/monument/monument.component";
import { HomeComponent } from "./view/page/home/home.component";
import { HeaderComponent } from "./view/page/header.component";
import { FooterComponent } from "./view/page/footer.component";
import { PhotoModalComponent } from "./view/page/monument/modals/photo-modal.component";
import { WelcomeComponent } from "./view/welcome/welcome.component";
import { PageComponent } from "./view/page/page.component";
import { ExtendedSearchComponent } from "./view/page/extended-search/extended-search.component";
import { FormInputComponent } from "./view/page/extended-search/form/form-input/form-input.component";
import { FormSelectComponent } from "./view/page/extended-search/form/form-select/form-select.component";
import { MonumentListComponent } from "./view/components/monument-list/monument-list.component";
import { MonumentListElementComponent } from "./view/components/monument-list-element/monument-list-element.component";


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        MonumentComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        PhotoModalComponent,
        WelcomeComponent,
        PageComponent,
        ExtendedSearchComponent,
        FormInputComponent,
        FormSelectComponent,
        MonumentListComponent,
        MonumentListElementComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCmedK-uMWOPLLYSpegtc-Lz3QjjjGUrLY"
        }),
        InfiniteScrollModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [SalsahService, LimcService, GoogleService, LocalStorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
