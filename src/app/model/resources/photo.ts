import { GraphNode } from "../apiresult/graph-node";

export class Photo {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

    public url: string;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Photo from a GraphNode instance.
     * @param node the graphnode
     * @returns {Photo}
     */
    public static fromGraphNode(node: GraphNode): Photo {

        let photo: Photo = new Photo();
        photo.graphNode = node;

        photo.url = node.getValues("limc:url")[0];

        return photo;

    }

}
