import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class StringArrayToNumberArrayConverter implements JsonCustomConvert<number[]> {

    serialize(data: number[]): string[] {

        const array: string[] = [];

        for (const n of data) {
            array.push("" + n);
        }

        return array;

    }

    deserialize(data: string[]): number[] {

        const array: number[] = [];

        for (const s of data) {
            if (isNaN(parseInt(s, 10))) throw new TypeError();
            array.push(+s);
        }

        return array;

    }

}
