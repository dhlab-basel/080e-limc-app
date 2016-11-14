import { JsonObject, JsonProperty } from "json2typescript";

import { GraphNodeResourceInfo } from "./graph-node-resource-info";


@JsonObject
export class GraphNodeProperty {

    @JsonProperty("label", String)
    public label: String = undefined;

    @JsonProperty("pid", String)
    public pid: String = undefined;

    @JsonProperty("value_ids", [String])
    public value_ids: String[] = undefined;

    @JsonProperty("values", [String])
    public values: String[] = undefined;

}