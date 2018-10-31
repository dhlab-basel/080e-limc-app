import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class NumberToBooleanConverter implements JsonCustomConvert<boolean> {

    serialize(data: boolean): number {
        return data ? 1 : 0;
    }

    deserialize(data: number): boolean {
        if (data !== 0 && data !== 1) throw new TypeError();
        return data === 1;
    }

}
