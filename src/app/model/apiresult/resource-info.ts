import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class ResourceInfo {

    public project_id: number = undefined;
    public person_id: number = undefined;
    public restype_id: number = undefined;
    public restype_name: string = undefined;
    public restype_label: string = undefined;
    public restype_description: string = undefined;
    public restype_iconsrc: string = undefined;
    public preview: string = undefined;

}