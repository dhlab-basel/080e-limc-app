import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class GraphNodeProperty {

    @JsonProperty("label", String)
    public label: string = undefined;

    @JsonProperty("pid", String)
    public pId: string = undefined;

    @JsonProperty("value_ids", [String])
    public valueIds: string[] = undefined;

    @JsonProperty("values", [String])
    public values: string[] = undefined;

    /**
     * Gets the values as an array.
     * @returns {string[]}
     */
    public getValues(): string[] {
        return this.values.length > 0 ? this.values : [];
    }

}
