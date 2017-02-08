import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./view/home/home.component";
import { DetailsComponent } from "./view/details/details.component";


const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: HomeComponent },
    { path: 'search/:search', component: HomeComponent },
    { path: 'monument/:id', component: DetailsComponent },
    { path: '**', redirectTo: 'search' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}