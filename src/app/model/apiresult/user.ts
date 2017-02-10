import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class User {

    @JsonProperty("lang", String)
    public lang: string = undefined;

    @JsonProperty("language_id", String)
    public language_id: string = undefined;

    //@JsonProperty("PHPSESSION", Boolean)
    //public phpsession: boolean = undefined;

    @JsonProperty("user_id", String, true)
    public id: string = undefined;

    @JsonProperty("username", String, true)
    public username: string = undefined;

    @JsonProperty("firstname", String, true)
    public firstname: string = undefined;

    @JsonProperty("lastname", String, true)
    public lastname: string = undefined;

}
