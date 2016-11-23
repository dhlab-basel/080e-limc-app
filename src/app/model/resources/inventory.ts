import { Museum } from "./museum";
import { GraphNode } from "../apiresult/graph-node";

export class Inventory {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

    public number: string;
    public specification: string;

    public museum: Museum;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Inventory from a GraphNode instance.
     * @param node the graphnode
     * @returns {Scene}
     */
    public static fromGraphNode(node: GraphNode): Inventory {

        let inventory: Inventory = new Inventory();
        inventory.graphNode = node;

        inventory.number = node.getValues("limc:number")[0];
        inventory.specification = node.getValues("limc:specification")[0];

        return inventory;

    }

    /**
     * Adds a connection if possible.
     * @param connection
     */
    public addConnection(connection: any) {
        if (connection instanceof Museum) this.museum = connection;
    }

}
