import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "./user";
import { Graph } from "./graph";
import { Monument } from "../resources/monument";
import { GraphNode } from "./graph-node";


@JsonObject
export class GraphData {

    @JsonProperty("graph", Graph)
    public graph: Graph = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    @JsonProperty("userdata", User)
    public user: User = undefined;

    public getMonuments(): Monument[] {

        let monuments: Monument[] = [];
        let i = 0;

        for (let key in this.graph.nodes) {

            let node: GraphNode = this.graph.nodes[key];

            if (node.resinfo.label == "Monument") {
                let monument: Monument = Monument.fromGraphNode(node);
                monuments[i] = monument;
                i++;
            }

            console.log();
        }

        return monuments;

    }

}