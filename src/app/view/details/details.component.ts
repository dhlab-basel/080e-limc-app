import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

import { SearchService } from "../../model/service/search.service";

import { Monument } from "../../model/resources/monument";
import { PhotoModalComponent } from "./photo-modal.component";
import { Photo } from "../../model/resources/photo";
import { SalsahService } from "../../model/service/salsah.service";
import { Resource } from "../../model/apiresult/resource";

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
     * @param salsahService
     * @param searchService
     */
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private salsahService: SalsahService, private searchService: SearchService) {
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
