import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs/observable/combineLatest";

import { SearchService } from "../../../model/service/search.service";
import { LimcService } from "../../../model/service/limc.service";

import { Monument } from "../../../model/resources/monument";
import { PhotoModalComponent } from "./modals/photo-modal.component";
import { Photo } from "../../../model/resources/photo";

@Component({
    selector: "app-details",
    templateUrl: "./monument.component.html",
    styleUrls: ["./monument.component.scss"]
})
/**
 * Detail page for a monument.
 */
export class MonumentComponent implements OnInit, OnDestroy {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The gallery modal element
     */
    @ViewChild("gallery") gallery: PhotoModalComponent;

    /**
     * The current monument.
     */
    monument: Monument = null;


    /////////////
    // METHODS //
    /////////////


    /**
     * Constructor.
     * @param router
     * @param activatedRoute
     * @param limcService
     */
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private limcService: LimcService) {
    }

    /**
     * NgOnInit.
     */
    ngOnInit() {

        this.monument = this.limcService.search.selectedMonument;

        this.activatedRoute.params.subscribe(
            (params: Params) => {

                const resourceId: number = params["resourceId"] ? parseInt(params["resourceId"], 10) : 0;

                if (resourceId === 0) {
                    this.router.navigate(["page"]);
                } else {
                    this.getMonument(resourceId);
                }

            }
        );

    }

    /**
     * NgOnDestroy.
     */
    ngOnDestroy() {
        // for (let subscription of this.subscriptions) subscription.unsubscribe();
    }

    /**
     * Gets the monument.
     * @param resourceId
     */
    getMonument(resourceId: number) {

        this.limcService.getMonumentByResourceId(resourceId).subscribe(
            (monument: Monument) => {
                this.monument = monument;
            },
            (error: any) => {
                console.error(error);
                this.router.navigate(["page"]);
            }
        );


        /*
         // Get the monument from the list of the search if possible
         this.monument = this.searchService.monuments.find((monument: Monument) => {
         return monument.id === id;
         });

         // Get the monument from the server if necessary
         if (this.monument instanceof Monument) return;

         // No data is available, so we have to search
         this.searchService.search(id + "", 100, 0);


         /*
         // Get detailed information now
         this.salsahService.getResourceById(this.monument.getSalsahId()).subscribe(
         (resource: Resource) => {
         console.log(resource);
         if (resource.props["limc:bibliography"] && resource.props["limc:bibliography"].values && resource.props["limc:bibliography"].values.length > 0)
         this.monument.bibliography = resource.props["limc:bibliography"].values[0];
         if (resource.props["limc:description"] && resource.props["limc:description"].values && resource.props["limc:description"].values.length > 0)
         this.monument.description = resource.props["limc:description"].values[0];
         },
         (error: Error) => {
         console.log(error);
         }
         );*/


    }

    /**
     * Opens the gallery
     * @param activeIndex
     */
    openGallery(activeIndex: number) {

        const imageUrls: string[] = this.monument.getPhotos().map((photo: Photo): string => {
            return photo.url;
        });
        this.gallery.openWithImages(imageUrls, activeIndex);

    }

}
