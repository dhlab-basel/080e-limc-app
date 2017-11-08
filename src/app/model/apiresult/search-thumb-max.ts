import { Any, JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class SearchThumbMax {

    @JsonProperty("nx", Any)
    public nx: number = undefined;

    @JsonProperty("ny", Any)
    public ny: number = undefined;

}