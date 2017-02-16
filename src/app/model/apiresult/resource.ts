import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "./user";
import { ResourceInfo } from "./resource-info";
import { ResourceData } from "./resource-data";
import { ResourceProperty } from "./resource-property";


@JsonObject
export class Resource {

    @JsonProperty("resinfo", ResourceInfo)
    public resinfo: ResourceInfo = undefined;

    @JsonProperty("resdata", ResourceData)
    public resdata: ResourceData = undefined;

    @JsonProperty("props", [ResourceProperty])
    public props: any = undefined;

    @JsonProperty("incoming", [undefined])
    public incoming: any[] = undefined;

    @JsonProperty("access", String)
    public access: string = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    @JsonProperty("user", User, true)
    public user: User = undefined;

}