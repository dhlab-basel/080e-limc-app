import { Any, JsonObject, JsonProperty } from "json2typescript"

import { StringToNumberConverter } from "../converters/string-to-number-converter";
import { StringToBooleanConverter } from "../converters/string-to-boolean-converter";

@JsonObject
export class ResourceProperty {

    @JsonProperty("pid", StringToNumberConverter)
    public pId: number = undefined;

    @JsonProperty("regular_property", Number)
    public regularProperty: number = undefined;

    @JsonProperty("valuetype_id", StringToNumberConverter)
    public valueTypeId: number = undefined;

    @JsonProperty("guielement",  String)
    public guiElement: string = undefined;

    @JsonProperty("is_annotation", StringToBooleanConverter)
    public isAnnotation: string = undefined;

    @JsonProperty("label", String)
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
