import { JsonObject, JsonProperty } from "json2typescript";

import { StringToNumberConverter } from "../converters/string-to-number-converter";

@JsonObject
export class SelectionData {

    @JsonProperty("id", StringToNumberConverter)
    id: number = undefined;

    @JsonProperty("name", String)
    name: string = undefined;

    @JsonProperty("label", String)
    label: string = undefined;

    @JsonProperty("description", String)
    description: string = undefined;

    @JsonProperty("vocabulary_id", StringToNumberConverter)
    vocabulary_id: number = undefined;

    @JsonProperty("vocabulary_name", String)
    vocabulary_name: string = undefined;

    @JsonProperty("person_id", StringToNumberConverter)
    person_id: number = undefined;

}
