import { Monument } from "../resources/monument";
import { Search } from "../apiresult/search";

export class LimcSearch {

    /**
     * The search result
     */
    monuments: Monument[] = [];

    /**
     * The currently selected monument
     */
    selectedMonument: Monument = null;

    /**
     * The search instance
     */
    result: Search | null = null;

    /**
     * The last search string
     */
    keyword: string = "";

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Resets the search.
     */
    reset() {
        this.selectedMonument = null;
        this.result = null;
        this.monuments = [];
        this.selectedMonument = null;
    }

}
