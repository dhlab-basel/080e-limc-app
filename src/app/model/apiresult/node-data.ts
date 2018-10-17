import { JsonObject, JsonProperty } from "json2typescript";
import { StringToNumberConverter } from "../converters/string-to-number-converter";
import { TranslateService } from "@ngx-translate/core";


@JsonObject
export class NodeData {

    @JsonProperty("id", StringToNumberConverter)
    id: number = undefined;

    @JsonProperty("name", String)
    name: string = undefined;

    @JsonProperty("order", StringToNumberConverter)
    order: number = undefined;

    @JsonProperty("label", [String])
    label: string[] = undefined;

    /**
     * Gets the label in the correct language
     * @param translateService
     */
    getLabel(translateService: TranslateService) {
        const lang = translateService.currentLang;

        if (this.label[lang]) {
            return this.label[lang];
        } else {
            return this.label["de"];
        }
    }

}
