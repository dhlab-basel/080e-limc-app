import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "./user";
import { Graph } from "./graph";

@JsonObject
export class GraphData {

    @JsonProperty("graph", Graph)
    public graph: Graph = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    @JsonProperty("userdata", User)
    public user: User = undefined;

}
