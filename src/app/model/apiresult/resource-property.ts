import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class ResourceProperty {

    @JsonProperty("pid", String)
    public pid: string = undefined;

    @JsonProperty("regular_property", Number)
    public regular_property: number = undefined;

    @JsonProperty("valuetype_id", String)
    public valuetype_id: string = undefined;

    @JsonProperty("guielement",  String)
    public guielement: string = undefined;

    @JsonProperty("is_annotation", String)
    public is_annotation: string = undefined;

    @JsonProperty("label", String)
    public label: string = undefined;

    @JsonProperty("attributes", String)
    public attributes: string = undefined;

    //@JsonProperty("occurence", String)
    public occurence: string = undefined;

    public values: number[];
    public value_ids: number[];
    public comments: string[];
    public value_rights: number[];
    public value_iconsrcs: string[];
    public value_restype: string[];
    public value_firstprops: string[];

}