import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class StringToBooleanConverter implements JsonCustomConvert<boolean> {

    serialize(data: boolean): string {
        return data ? "1" : "0";
    }

    deserialize(data: string): boolean {
        if (data !== "0" && data !== "1") throw new TypeError();
        return data === "1";
    }

}