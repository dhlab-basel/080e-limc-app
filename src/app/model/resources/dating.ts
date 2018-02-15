import { GraphNode } from "../apiresult/graph-node";
import { Epoch } from "./epoch";

export class Dating {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

    public period: [string, string];
    public comment: string;

    public epoch: Epoch;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Dating from a GraphNode instance.
     * @param node the graphnode
     * @returns {Dating}
     */
    public static fromGraphNode(node: GraphNode): Dating {

        let dating: Dating = new Dating();
        dating.graphNode = node;

        dating.comment = node.getValues("limc:comment")[0];
        dating.period = Epoch.getPeriodFromString(node.getValues("limc:period")[0]);

        return dating;

    }

    /**
     * Adds a connection if possible.
     * @param connection
     */
    public addConnection(connection: any) {
        if (connection instanceof Epoch) this.epoch = connection;
    }

}
