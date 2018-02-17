import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class ResourceInfoImage {

    @JsonProperty("duration", Number)
    public duration: number = undefined;

    @JsonProperty("format_name", Number)
    public formatName: string = undefined;

    @JsonProperty("fps", Number)
    public fps: number = undefined;

    @JsonProperty("nx", Number)
    public nx: number = undefined;

    @JsonProperty("ny", Number)
    public ny: number = undefined;

    @JsonProperty("origname", Number)
    public originalName: string = undefined;

    @JsonProperty("path", Number)
    public url: string = undefined;

    @JsonProperty("protocol", Number)
    public protocol: string = undefined;

}
