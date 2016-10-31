import { JsonObject, JsonProperty } from "json2typescript";

import { SearchSubject } from "./search-subject";
import { SearchPaging } from "./search-paging";
import { SearchThumbMax } from "./search-thumb-max";
import { User } from "./user";
import { Resource } from "./resource";
import { SalsahService } from "../service/salsah.service";

@JsonObject
export class Search {

    @JsonProperty("subjects", [SearchSubject])
    public subjects: SearchSubject[] = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    @JsonProperty("nhits", String)
    public nhits: string = undefined;

    @JsonProperty("paging", [SearchPaging])
    public paging: SearchPaging[] = undefined;

    @JsonProperty("thumb_max", SearchThumbMax)
    public thumb_max: SearchThumbMax = undefined;

    @JsonProperty("userdata", User)
    public user: User = undefined;

    getResources(salsahService: SalsahService) {

        for (let subject of this.subjects) {

            salsahService.getResourceById(subject.obj_id).subscribe(
                (resource: Resource) => {
                    console.log(resource);
                },
                (error: any) => {
                    console.log('error');
                },
                () => {
                }
            );

        }

    }

}