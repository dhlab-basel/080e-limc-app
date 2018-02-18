import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class GraphNodeResourceInfo {

    @JsonProperty("firstproperty", String)
    public firstProperty: String = undefined;

    @JsonProperty("iconsrc", String)
    public iconSrc: String = undefined;

    @JsonProperty("label", String)
    public label: String = undefined;

}
