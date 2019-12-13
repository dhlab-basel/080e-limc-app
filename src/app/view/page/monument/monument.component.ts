import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";


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
    @ViewChild("gallery", { static: false }) gallery: PhotoModalComponent;

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
    ngOnDestroy() {}

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

    }

    /**
     * Opens the gallery
     * @param activeIndex
     */
    openGallery(activeIndex: number) {
        const photos: Photo[] = this.monument.getPhotos();
        const credits: string[] = this.monument.getBasicPhotoCredits();
        this.gallery.openWithImages(photos, credits, activeIndex);
    }

}
