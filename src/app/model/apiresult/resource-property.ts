import { Any, JsonObject, JsonProperty } from "json2typescript"

import { StringToNumberConverter } from "../converters/string-to-number-converter";
import { AnyToBooleanConverter } from "../converters/any-to-boolean-converter";

@JsonObject
export class ResourceProperty {

    @JsonProperty("pid", StringToNumberConverter, true)
    public pId: number = undefined;

    @JsonProperty("regular_property", Number, true)
    public regularProperty: number = undefined;

    @JsonProperty("valuetype_id", StringToNumberConverter)
    public valueTypeId: number = undefined;

    @JsonProperty("guielement",  String)
    public guiElement: string = undefined;

    @JsonProperty("is_annotation", AnyToBooleanConverter)
    public isAnnotation: boolean = undefined;

    @JsonProperty("label", String, true)
    public label: string = undefined;

    @JsonProperty("attributes", String)
    public attributes: string = undefined;

    @JsonProperty("occurrence", String)
    public occurrence: string = undefined;

    @JsonProperty("values", [Any], true)
    public values: any[] = [];

    @JsonProperty("value_ids", [String], true)
    public valueIds: string[] = [];

    @JsonProperty("comments", [String], true)
    public comments: string[] = [];

}
