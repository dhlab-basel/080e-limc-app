import { JsonObject, JsonProperty } from "json2typescript";

import { GraphNodeResourceInfo } from "./graph-node-resource-info";
import { GraphNodeProperty } from "./graph-node-property";


@JsonObject
export class GraphNode {

    @JsonProperty("properties", [GraphNodeProperty])
    public properties: GraphNodeProperty[] = undefined;

    @JsonProperty("resinfo", GraphNodeResourceInfo)
    public resinfo: GraphNodeResourceInfo = undefined;

}