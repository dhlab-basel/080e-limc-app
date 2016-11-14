import { JsonObject, JsonProperty } from "json2typescript";


@JsonObject
export class GraphNodeResourceInfo {

    @JsonProperty("firstproperty", String)
    public firstproperty: String = undefined;

    @JsonProperty("iconsrc", String)
    public iconsrc: String = undefined;

    @JsonProperty("label", String)
    public label: String = undefined;

}