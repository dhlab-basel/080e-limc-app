import { JsonObject, JsonProperty } from "json2typescript";

import { StringToNumberConverter } from "../converters/string-to-number-converter";
import { ResourceInfoImage } from "./resource-info-image";

@JsonObject
export class ResourceInfo {

    @JsonProperty("project_id", StringToNumberConverter)
    public projectId: number = undefined;

    @JsonProperty("person_id", StringToNumberConverter)
    public personId: number = undefined;

    @JsonProperty("restype_id", StringToNumberConverter)
    public resTypeId: number = undefined;

    @JsonProperty("handle_id", String)
    public handleId: string = undefined;

    @JsonProperty("restype_name", String)
    public resTypeName: string = undefined;

    @JsonProperty("restype_label", String)
    public resTypeLabel: string = undefined;

    @JsonProperty("restype_description", String)
    public resTypeDescription: string = undefined;

    @JsonProperty("restype_iconsrc", String)
    public resTypeIconSrc: string = undefined;

    @JsonProperty("locations", [ResourceInfoImage])
    public thumbnailImages: ResourceInfoImage[] = undefined;

    @JsonProperty("locdata", ResourceInfoImage)
    public fullImage: ResourceInfoImage = undefined;

}
