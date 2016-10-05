import {JsonObject, JsonProperty} from "./json-convert";

//@JsonObject
export class User {

    @JsonProperty("prop", String)
    public name: string = "";

    constructor() {}

    greeting() {
        return "Hello, " + this.name + "!";
    }

}