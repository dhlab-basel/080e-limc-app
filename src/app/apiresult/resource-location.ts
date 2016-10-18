import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class ResourceLocation {

    @JsonProperty("path", String)
    public path: string = undefined;

    @JsonProperty("protocol", String)
    public protocol: string = undefined;

    @JsonProperty("origname", String)
    public origname: string = undefined;

    @JsonProperty("format_name", String)
    public format_name: string = undefined;

    @JsonProperty("nx", String)
    public nx: string = undefined;

    @JsonProperty("ny", String)
    public ny: string = undefined;

    @JsonProperty("duration", String)
    public duration: string = undefined;

    @JsonProperty("fps", String)
    public fps: string = undefined;

}