import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class GraphNodeResourceInfo {

    @JsonProperty("firstproperty", String)
    public firstProperty: string = undefined;

    @JsonProperty("iconsrc", String)
    public iconSrc: string = undefined;

    @JsonProperty("label", String)
    public label: string = undefined;

    @JsonProperty("handle_id", String)
    public handleId: string = undefined;

}
