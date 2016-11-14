import { JsonObject, JsonProperty } from "json2typescript";

import { SalsahService } from "../service/salsah.service";
import { GraphData } from "./graph-data";

@JsonObject
export class SearchSubject {

    @JsonProperty("obj_id", String)
    public obj_id: string = undefined;

    @JsonProperty("preview_path", String)
    public preview_path: string = undefined;

    @JsonProperty("iconsrc", String)
    public iconsrc: string = undefined;

    @JsonProperty("icontitle", String)
    public icontitle: string = undefined;

    @JsonProperty("iconlabel", String)
    public iconlabel: string = undefined;

    @JsonProperty("valuetype_id", [String])
    public valuetype_id: string = undefined;

    @JsonProperty("valuelabel", [String])
    public valuelabel: string = undefined;

    @JsonProperty("value", [String])
    public value: string = undefined;

    public getGraph(salsahService: SalsahService) {

        salsahService.getGraphDataById(this.obj_id)
            .subscribe(
            (graphData: GraphData) => {
                console.log(graphData);
            },
            (error: any) => { console.log('error');/*this.error = <any>error*/ },
            () => { }
        );

    }

}