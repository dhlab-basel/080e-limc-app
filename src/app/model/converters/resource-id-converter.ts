import { JsonConverter, JsonCustomConvert } from "json2typescript";

@JsonConverter
export class ResourceIdConverter implements JsonCustomConvert<number> {

    serialize(data: number): string {
        return data + "_-_local";
    }

    deserialize(data: string): number {

        // Remove the local
        data = data.replace("_-_local", "");

        if (isNaN(parseInt(data, 10))) throw new TypeError();
        return +data;

    }

}