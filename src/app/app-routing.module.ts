import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./view/page/home/home.component";
import { MonumentComponent } from "./view/page/monument/monument.component";
import { WelcomeComponent } from "./view/welcome/welcome.component";
import { PageComponent } from "./view/page/page.component";


const routes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "page", component: PageComponent, children:
            [
                { path: "search", component: HomeComponent },
                { path: "search/:search", component: HomeComponent },
                { path: "monument/:resourceId", component: MonumentComponent },
                { path: "**", redirectTo: "search" }
            ]
    },
    { path: "monument/:resourceId", redirectTo: "page/monument/:resourceId" },
    { path: "**", redirectTo: "page" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
