import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class SearchThumbMax {

    @JsonProperty("nx", Number)
    public nx: number = undefined;

    @JsonProperty("ny", Number)
    public ny: number = undefined;

}