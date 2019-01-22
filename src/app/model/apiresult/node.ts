import { JsonObject, JsonProperty } from "json2typescript";

import { NodeData } from "./node-data";


@JsonObject
export class Node {

    @JsonProperty("status", Number)
    status: number = undefined;

    @JsonProperty("selection", [NodeData])
    selection: NodeData[] = undefined;

    @JsonProperty("userdata")
    userdata: any = undefined;

}
