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
        dating.period = Dating.getPeriodFromString(node.getValues("limc:period")[0]);

        return dating;

    }

    /**
     * Gets a period from a string
     * @param str a string formatted as "fromYear - toYear"
     * @returns {[string, string]}
     */
    public static getPeriodFromString(str: string): [string, string] {

        if (typeof str === "undefined") return ["", ""];

        let period: [string, string] = ["", ""];

        let split: string[] = str.split(" - ");

        if (split.length == 2) {
            period[0] = split[0];
            period[1] = split[1];
        }

        return period;

    }

    /**
     * Adds a connection if possible.
     * @param connection
     */
    public addConnection(connection: any) {
        if (connection instanceof Epoch) this.epoch = connection;
    }

}
