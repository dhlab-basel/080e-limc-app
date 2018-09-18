import { JsonObject, JsonProperty } from "json2typescript";

import { StringToNumberConverter } from "../converters/string-to-number-converter";

@JsonObject
export class ResourceIncomingInfo {

    @JsonProperty("id", StringToNumberConverter)
    public id: number = undefined;

    @JsonProperty("pid", StringToNumberConverter)
    public propertyId: number = undefined;

    @JsonProperty("vid", StringToNumberConverter)
    public valueId: number = undefined;

}
