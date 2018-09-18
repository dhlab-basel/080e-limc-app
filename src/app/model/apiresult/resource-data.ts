import { JsonObject, JsonProperty } from "json2typescript";

import { StringToNumberConverter } from "../converters/string-to-number-converter";

@JsonObject
export class ResourceData {

    @JsonProperty("res_id", StringToNumberConverter)
    public resId: number = undefined;

    @JsonProperty("restype_name", String)
    public resTypeName: string = undefined;

    @JsonProperty("restype_label", String)
    public resTypeLabel: string = undefined;

    @JsonProperty("iconsrc", String)
    public iconSrc: string = undefined;

    @JsonProperty("resclass_name", String)
    public resClassName: string = undefined;

    @JsonProperty("rights", StringToNumberConverter)
    public rights: number = undefined;

}
