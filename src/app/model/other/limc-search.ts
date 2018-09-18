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
    result: Search = null;

    /**
     * The last search string
     */
    keyword: string = "";

    /**
     * Constructor.
     */
    constructor() {}

}
