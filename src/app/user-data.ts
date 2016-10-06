import {JsonObject, JsonProperty} from "./json-convert";
import { User } from "./user";

@JsonObject
export class UserData {

    public a: string = "";

    @JsonProperty("al", String)
    public a_primitive1: string = undefined;

    @JsonProperty("a", String)
    public a_primitive2: string = undefined;

    @JsonProperty("a", String)
    public a_primitive3: string = undefined;


    public b: string[] = undefined;

    @JsonProperty("b", [])
    public b_array1: string[] = undefined;

    @JsonProperty("b", [[String]])
    public b_array2: string[] = undefined;

    @JsonProperty("b", [[String, String], [String]])
    public b_array3: string[] = undefined;


    public c: User[] = undefined;

    @JsonProperty("c", User)
    public c_object1: User = undefined;


    public d: User[] = undefined;

    @JsonProperty("d", undefined)
    public d_array1: User[] = undefined;

    @JsonProperty("d", [[User], undefined, User])
    public d_array2: User[] = undefined;

    @JsonProperty("d", [[undefined], User, User])
    public d_array3: User[] = undefined;

}