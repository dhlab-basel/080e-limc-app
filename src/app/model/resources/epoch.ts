import { GraphNode } from "../apiresult/graph-node";
import { Dating } from "./dating";

export class Epoch {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

    public name: string;
    public period: [string, string];
    public sequence: number;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Epoch from a GraphNode instance.
     * @param node the graphnode
     * @returns {Epoch}
     */
    public static fromGraphNode(node: GraphNode): Epoch {

        let epoch: Epoch = new Epoch();
        epoch.graphNode = node;

        epoch.name = node.getValues("limc:name")[0];
        epoch.period = Dating.getPeriodFromString(node.getValues("limc:period")[0]);
        epoch.sequence = parseInt(node.getValues("limc:sequence")[0]);

        return epoch;

    }

}
