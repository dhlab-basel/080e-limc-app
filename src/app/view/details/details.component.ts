import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

import { SearchService } from "../../model/service/search.service";

import { Monument } from "../../model/resources/monument";
import { PhotoModalComponent } from "./photo-modal.component";
import { Photo } from "../../model/resources/photo";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
/**
 * Detail page for a monument.
 */
export class DetailsComponent implements OnInit {

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
     * @param searchService
     */
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private searchService: SearchService) {
    }

    /**
     * NgOnInit.
     */
    ngOnInit() {

        // Make sure we scroll to the top
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            document.body.scrollTop = 0;
        });

        // Get the document data
        this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                let id = parseInt(params['id']);
                this.getMonument(id);
            } else {
                this.router.navigate(['search']);
            }
        });

    }

    /**
     * Gets the monument.
     * @param id
     */
    getMonument(id: number) {

        // Get the monument from the list of the search if possible
        let monuments: Monument[] = this.searchService.monuments.filter((monument: Monument) => {
            return monument.id === id;
        });

        if (monuments.length === 0) {
            this.router.navigate(['search']);
            return;
        }

        // Save the monument
        this.monument = monuments[0];
        console.log(this.monument);

    }

    /**
     * Opens the gallery
     * @param activeIndex
     */
    openGallery(activeIndex: number) {
        let imageUrls: string[] = this.monument.getPhotos().map((photo: Photo): string => {
            return photo.url;
        });
        this.gallery.openWithImages(imageUrls, activeIndex);
    }

}
