import { JsonObject, JsonProperty } from "json2typescript";

import { SearchSubject } from "./search-subject";
import { SearchPaging } from "./search-paging";
import { SearchThumbMax } from "./search-thumb-max";
import { User } from "./user";
import { Resource } from "./resource";
import { SalsahService } from "../service/salsah.service";
import { Monument } from "../resources/monument";
import { StringToNumberConverter } from "../converters/string-to-number-converter";

@JsonObject
export class Search {

    @JsonProperty("subjects", [SearchSubject])
    public subjects: SearchSubject[] = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    @JsonProperty("nhits", StringToNumberConverter)
    public nhits: number = undefined;

    @JsonProperty("paging", [SearchPaging])
    public paging: SearchPaging[] = undefined;

    @JsonProperty("thumb_max", SearchThumbMax)
    public thumb_max: SearchThumbMax = undefined;

    @JsonProperty("userdata", User, true)
    public user: User = undefined;

    /**
     * Checks whether the search has more results to look for.
     * @returns {boolean}
     */
    hasMoreResults(): boolean {

        if (this.paging === undefined || this.paging === null) {
            return false;
        }

        let currentPage: number = 0;

        for (const p of this.paging) {
            if (p.current) break;
            currentPage++;
        }

        return currentPage < this.paging.length - 1;

    }

    /**
     * Gets the next start index.
     * @returns {number}
     */
    getNextStartIndex(): number {

        if (this.paging === undefined || this.paging === null || this.paging.length <= 1) {
            return -1;
        }

        let currentPage: number = 0;

        for (const p of this.paging) {
            if (p.current) break;
            currentPage++;
        }

        return currentPage < this.paging.length - 1 ? this.paging[currentPage + 1].start_at : -1;

    }

}
