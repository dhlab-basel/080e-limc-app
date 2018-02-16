import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class StringToNumberConverter implements JsonCustomConvert<number> {

    serialize(data: number): string {
        return "" + data;
    }

    deserialize(data: string): number {
        if (isNaN(parseInt(data, 10))) throw new TypeError();
        return +data;
    }

}
