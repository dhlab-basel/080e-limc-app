export function JsonProperty(jsonKey: string): any {
    return function(target: any, key: string) {
        if (typeof target.mapping === "undefined") target["mapping"] = [];
        target["mapping"][key] = jsonKey;
    }
}

export interface JsonFeed {
    mapping: string[];
}


export class UserData implements JsonFeed {

    public mapping: string[];

    @JsonProperty("blob")
    public blub: string = "heys";


    @JsonProperty("blob")
    private _blab: string = undefined;
    public get blab(): string {
        return this._blab;
    }
    public set blab(value: string) {
        this._blab = value;
    }


    constructor() {
        console.log("-----");
        console.log("Constructor UserData");
        console.log("-----");
    }

}