export function JsonProperty(jsonKey: string, type?: string): any {

    return function(target: any, key: string) {

        if (typeof(target.mapping) === "undefined") target["mapping"] = [];
        if (typeof(type) === "undefined") type = "undefined";

        target["mapping"][key] = {
            "jsonKey": jsonKey,
            "type": type
        };

    }
}

export interface JsonFeed {
    mapping: string[];
}


export class UserData implements JsonFeed {

    public mapping: string[];

    @JsonProperty("blub", "[]")
    public blub: string[] = ["heya", "heyb"];

    @JsonProperty("blab", "string")
    private _blab: string = undefined;
    public get blab(): string {
        return this._blab;
    }
    public set blab(value: string) {
        this._blab = value;
    }

    @JsonProperty("user", "[]")
    public user: any = undefined;

    constructor() {}

}

export class User implements JsonFeed {

    public mapping: string[];

    public name: string = undefined;

}