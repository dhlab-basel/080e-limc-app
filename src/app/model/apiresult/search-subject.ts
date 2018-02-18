import { Any, JsonObject, JsonProperty } from "json2typescript";

import { StringArrayToNumberArrayConverter } from "../converters/string-array-to-number-array-converter";
import { ResourceIdConverter } from "../converters/resource-id-converter";

@JsonObject
export class SearchSubject {

    @JsonProperty("obj_id", ResourceIdConverter)
    public resourceId: number = undefined;

    @JsonProperty("preview_path", String)
    public previewPath: string = undefined;

    @JsonProperty("iconsrc", String)
    public iconSrc: string = undefined;

    @JsonProperty("icontitle", String)
    public iconTitle: string = undefined;

    @JsonProperty("iconlabel", String)
    public iconLabel: string = undefined;

    @JsonProperty("valuetype_id", StringArrayToNumberArrayConverter)
    public valueTypeIds: number[] = undefined;

    @JsonProperty("valuelabel", [String])
    public valueLabels: string[] = undefined;

    @JsonProperty("value", [Any])
    public values: any = undefined;


    public isMonument() {

    }

/*    public getGraph(salsahService: SalsahService) {

        salsahService.getGraphDataById(this.obj_id)
            .subscribe(
            (graphData: GraphData) => {
                console.log(graphData);
            },
            (error: any) => { console.log('error');/*this.error = <any>error* },
            () => { }
        );
*
    }*/

}
