import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class AnyToBooleanConverter implements JsonCustomConvert<boolean> {

    serialize(data: boolean): any {
        return data ? 1 : 0;
    }

    deserialize(data: any): boolean {
        return parseInt(data, 10) === 1;
    }

}
