import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "./user";
import { ResourceInfo } from "./resource-info";
import { ResourceData } from "./resource-data";
import { ResourceProperty } from "./resource-property";


@JsonObject
export class Resource {

    @JsonProperty("resinfo", ResourceInfo)
    public resinfo: ResourceInfo;

    @JsonProperty("resdata", ResourceData)
    public resdata: ResourceData;

    //@JsonProperty("props", [ResourceProperty])
    //public props: any;

    //@JsonProperty("incoming", User)
    //public incoming: any[];

    @JsonProperty("access", String)
    public access: string;

    @JsonProperty("status", Number)
    public status: number;

    @JsonProperty("user", User)
    public user: User;

}