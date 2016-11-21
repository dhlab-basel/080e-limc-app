import { JsonObject, JsonProperty } from "json2typescript";

import { GraphNodeResourceInfo } from "./graph-node-resource-info";
import { GraphNodeProperty } from "./graph-node-property";


@JsonObject
export class GraphNode {

    @JsonProperty("properties", [GraphNodeProperty])
    public properties: GraphNodeProperty[] = undefined;

    @JsonProperty("resinfo", GraphNodeResourceInfo)
    public resinfo: GraphNodeResourceInfo = undefined;

    /**
     * Gets the values by a property.
     * @param propertyKey the property key
     * @returns {string[]}
     */
    public getValues(propertyKey: string): string[] {
        return typeof this.properties[propertyKey] !== "undefined" ? this.properties[propertyKey].getValues() : [];
    }

}