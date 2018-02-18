import { GraphNode } from "../apiresult/graph-node";
import { Museum } from "./museum";

export class Photo {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number;

    public url: string;
    public photoCredit: string;
    public hasPhotoRight: boolean;


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

        photo.url = node.getValues("limc:monumentUrl")[0]; // TODO
        photo.photoCredit = node.getValues("limc:photoCredit")[0];

        if (node.getValues("limc:hasPhotoRight")[0] === "1") {
            photo.hasPhotoRight = true;
        } else if (node.getValues("limc:hasPhotoRight")[0] === "0") {
            photo.hasPhotoRight = false;
        }

        return photo;

    }

    /**
     * Checks whether the photo should be displayed to the user or not.
     * @param museum
     * @returns {boolean}
     */
    public shouldDisplay(museum: Museum): boolean {
        if (this.hasPhotoRight === undefined && museum instanceof Museum) return museum.hasPhotoRight;
        return this.hasPhotoRight;
    }

}
