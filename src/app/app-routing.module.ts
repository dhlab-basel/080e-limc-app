import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./view/page/home/home.component";
import { MonumentComponent } from "./view/page/monument/monument.component";
import { WelcomeComponent } from "./view/welcome/welcome.component";


const routes: Routes = [
    { path: "", component: WelcomeComponent },
    { path: "page", component: HomeComponent },
    { path: "page/:search", component: HomeComponent },
    { path: "monument/:id", component: MonumentComponent },
    { path: "**", redirectTo: "welcome" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
