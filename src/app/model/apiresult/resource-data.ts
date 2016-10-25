import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class ResourceData {

    public res_id: number = undefined;
    public restype_name: string = undefined;
    public restypelabel: string = undefined;
    public iconsrc: string = undefined;
    public resclassname: string = undefined;
    public resclass_iconsrc: string = undefined;
    public rights: number = undefined;

}