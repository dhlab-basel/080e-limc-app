import { JsonObject, JsonProperty } from "json2typescript";

import { StringToNumberConverter } from "../converters/string-to-number-converter";

@JsonObject
export class ResourceInfoImage {

    @JsonProperty("duration", StringToNumberConverter)
    public duration: number = undefined;

    @JsonProperty("format_name", String)
    public formatName: string = undefined;

    @JsonProperty("fps", StringToNumberConverter)
    public fps: number = undefined;

    @JsonProperty("nx", StringToNumberConverter)
    public nx: number = undefined;

    @JsonProperty("ny", StringToNumberConverter)
    public ny: number = undefined;

    @JsonProperty("origname", String)
    public originalName: string = undefined;

    @JsonProperty("path", String)
    public url: string = undefined;

    @JsonProperty("protocol", String)
    public protocol: string = undefined;

}
