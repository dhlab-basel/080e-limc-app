import { JsonObject, JsonProperty } from "json2typescript"

import { SelectionData } from "./selection-data";

@JsonObject
export class Selection {

    @JsonProperty("status", Number)
    status: number = undefined;

    @JsonProperty("selections", [SelectionData])
    selections: SelectionData[] = undefined;

    @JsonProperty("userdata")
    userdata: any = undefined;

}
