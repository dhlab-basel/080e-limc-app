import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class User {

    @JsonProperty("lang", String)
    public lang: string = undefined;

    @JsonProperty("language_id", Number)
    public language_id: number = undefined;

    @JsonProperty("PHPSESSION", Boolean)
    public phpsession: boolean = undefined;

    @JsonProperty("id", Number)
    public id: number = undefined;

    @JsonProperty("username", String)
    public username: string = undefined;

    @JsonProperty("firstname", String)
    public firstname: string = undefined;

    @JsonProperty("lastname", String)
    public lastname: string = undefined;

}
