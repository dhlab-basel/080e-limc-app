import { JsonObject, JsonProperty } from "json2typescript";

import { ResourceInfo } from "./resource-info";
import { ResourceIncomingInfo } from "./resource-incoming-info";

@JsonObject
export class ResourceIncoming {

    @JsonProperty("ext_res_id", ResourceIncomingInfo)
    public extResId: ResourceIncomingInfo = undefined;

    @JsonProperty("resinfo", ResourceInfo)
    public resInfo: ResourceInfo = undefined;

}
