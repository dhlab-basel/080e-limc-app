import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { AppRoutingModule } from "./app-routing.module";

import { SalsahService } from "./model/service/salsah.service";
import { LimcService } from "./model/service/limc.service";
import { GoogleService } from "./model/service/google.service";

import { AppComponent } from "./app.component";
import { MonumentComponent } from "./view/page/monument/monument.component";
import { HomeComponent } from "./view/page/home/home.component";
import { HeaderComponent } from "./view/page/header.component";
import { FooterComponent } from "./view/page/footer.component";
import { PhotoModalComponent } from "./view/page/monument/modals/photo-modal.component";
import { WelcomeComponent } from "./view/welcome/welcome.component";
import { PageComponent } from "./view/page/page.component";

@NgModule({
    declarations: [
        AppComponent,
        MonumentComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        PhotoModalComponent,
        WelcomeComponent,
        PageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCmedK-uMWOPLLYSpegtc-Lz3QjjjGUrLY"
        }),
        InfiniteScrollModule
    ],
    providers: [SalsahService, LimcService, GoogleService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
