import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "../apiresult/user";
import { ResourceInfo } from "../apiresult/resource-info";
import { ResourceData } from "../apiresult/resource-data";
import { MonumentData } from "./monument-data";

@JsonObject
export class MonumentResource {

    @JsonProperty("resinfo", ResourceInfo)
    public resinfo: ResourceInfo = undefined;

    @JsonProperty("resdata", ResourceData)
    public resdata: ResourceData = undefined;

    @JsonProperty("props", MonumentData)
    public props: MonumentData = undefined;

    @JsonProperty("incoming", undefined)
    public incoming: any[] = undefined;

    @JsonProperty("access", String)
    public access: string = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    //@JsonProperty("user", User)
    public user: User = undefined;
}