import { GraphNode } from "../apiresult/graph-node";
import { Museum } from "./museum";
import { LimcService } from "../service/limc.service";
import { SalsahService } from "../service/salsah.service";
import { Resource } from "../apiresult/resource";
import { ResourceInfo } from "../apiresult/resource-info";
import { ResourceInfoImage } from "../apiresult/resource-info-image";

export class Photo {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number = 0;

    public thumbnailUrl: string = "";
    public newPhoto: boolean = false;
    public url: string = "";
    public photoCredit: string = "";
    public hasPhotoRight: boolean | null = null;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Photo from a GraphNode instance.
     * @param node the graphnode
     * @returns {Photo}
     */
    public static fromGraphNode(node: GraphNode): Photo {

        const photo: Photo = new Photo();

        // photo.url = node.getValues("limc:monumentUrl")[0];
        photo.photoCredit = node.getValues("limc:photoCredit")[0];
        photo.newPhoto = node.getValues("limc:newPhoto")[0] === "1";

        if (node.getValues("limc:hasPhotoRight")[0] === "1") {
            photo.hasPhotoRight = true;
        } else if (node.getValues("limc:hasPhotoRight")[0] === "0") {
            photo.hasPhotoRight = false;
        }

        return photo;

    }

    /**
     * Fetches the URL of the photo from the server.
     */
    public setUrl() {

        if (this.hasPhotoRight === false || this.url !== "" || this.newPhoto === false) return;

        this.url = "https://www.salsah.org/core/sendlocdata.php?res=" + this.resourceId + "&qtype=full&reduce=1";
        this.thumbnailUrl = "https://www.salsah.org/core/sendlocdata.php?res=" + this.resourceId + "&qtype=thumbnail";

        /*
        salsahService.getResource(this.resourceId).subscribe(
            (resource: Resource) => {
                if (resource.resinfo instanceof ResourceInfo && resource.resinfo.fullImage instanceof ResourceInfoImage) {
                    this.thumbnailUrl = resource.resinfo.thumbnailImages.length > 0 ? resource.resinfo.thumbnailImages[0].url : resource.resinfo.fullImage.url;
                    this.url = resource.resinfo.fullImage.url;
                } else {
                    console.error("Resource has no photo");
                }
            },
            (error: any) => {
                console.error(error);
            }
        );*/

    }

}
