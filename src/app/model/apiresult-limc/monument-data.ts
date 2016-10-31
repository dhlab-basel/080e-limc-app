import { JsonObject, JsonProperty } from "json2typescript"
import { Property } from "../apiresult/resource-property";

@JsonObject
export class MonumentData {

    @JsonProperty("limc:id", Property)
    public id: Property = undefined;

    @JsonProperty("limc:discovery", Property)
    public discovery: Property = undefined;

    @JsonProperty("limc:discoveryDetail", Property)
    public discoveryDetail: Property = undefined;

    @JsonProperty("limc:object", Property)
    public object: Property = undefined;

    @JsonProperty("limc:material", Property)
    public material: Property = undefined;

    @JsonProperty("limc:origin", Property)
    public origin: Property = undefined;

    @JsonProperty("limc:country", Property)
    public country: Property = undefined;

    @JsonProperty("limc:artist", Property)
    public artist: Property = undefined;

    @JsonProperty("limc:category", Property)
    public category: Property = undefined;

    @JsonProperty("limc:technique", Property)
    public technique: Property = undefined;

    @JsonProperty("limc:keyword", Property)
    public keyword: Property = undefined;

    @JsonProperty("limc:scenename", Property)
    public scenename: Property = undefined;

    @JsonProperty("limc:dimension", Property)
    public dimension: Property = undefined;

    @JsonProperty("limc:description", Property)
    public description: Property = undefined;

    @JsonProperty("limc:inscription", Property)
    public inscription: Property = undefined;

    @JsonProperty("limc:bibliography", Property)
    public bibliography: Property = undefined;

    @JsonProperty("limc:comment", Property)
    public comment: Property = undefined;

    @JsonProperty("limc:dating", Property)
    public dating: Property = undefined;

    @JsonProperty("limc:scene", Property)
    public scene: Property = undefined;

    @JsonProperty("limc:inventory", Property)
    public inventory: Property = undefined;

}