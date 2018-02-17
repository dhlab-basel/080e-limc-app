import { Any, JsonObject, JsonProperty } from "json2typescript";

import { SalsahService } from "../service/salsah.service";
import { GraphData } from "./graph-data";
import { StringToNumberConverter } from "../converters/string-to-number-converter";

@JsonObject
export class SearchSubject {

    @JsonProperty("obj_id", String)
    public objId: string = undefined;

    @JsonProperty("preview_path", String)
    public previewPath: string = undefined;

    @JsonProperty("iconsrc", String)
    public iconSrc: string = undefined;

    @JsonProperty("icontitle", String)
    public iconTitle: string = undefined;

    @JsonProperty("iconlabel", String)
    public iconLabel: string = undefined;

    @JsonProperty("valuetype_id", [StringToNumberConverter])
    public valueTypeId: string = undefined;

    @JsonProperty("valuelabel", [String])
    public valueLabel: string = undefined;

    @JsonProperty("value", [Any])
    public value: any = undefined;


    public isMonument() {

    }

    public getGraph(salsahService: SalsahService) {
/*
        salsahService.getGraphDataById(this.obj_id)
            .subscribe(
            (graphData: GraphData) => {
                console.log(graphData);
            },
            (error: any) => { console.log('error');/*this.error = <any>error* },
            () => { }
        );
*/
    }

}
