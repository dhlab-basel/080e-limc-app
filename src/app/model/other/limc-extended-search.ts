import { Monument } from "../resources/monument";
import { Search } from "../apiresult/search";
import { FormArray } from "@angular/forms";
import { LimcExtendedSearchProperty } from "./limc-extended-search-property";

export class LimcExtendedSearch {

    /**
     * The search result, basically an intersection of all resultingMonuments
     */
    get monuments(): Monument[] {

        if (this.resultingMonuments.length === 0) return [];

        // As we have at least one search result, add it to the resulting array
        let monuments: Monument[] = this.resultingMonuments[0];

        // Now make an intersection by ID of all results.
        for (let i = 1; i < this.resultingMonuments.length; i++) {
            monuments = this.intersectMonuments(monuments, this.resultingMonuments[i]);
        }

        return monuments;

    }

    /**
     * The currently selected monument
     */
    selectedMonument: Monument = null;

    /**
     * The search instances
     */
    results: Search[] = [];

    /**
     * The search result by each search
     */
    resultingMonuments: Monument[][] = [];

    /**
     * The form array
     */
    formArray: FormArray | null;

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Resets the search.
     */
    reset() {
        this.selectedMonument = null;
        this.results = [];
        this.resultingMonuments = [];
    }

    /**
     * Gets the intersection of two Monument arrays by their id
     * @param a
     * @param b
     */
    private intersectMonuments(a: Monument[], b: Monument[]): Monument[] {
        const bIds: number[] = b.map(m => m.id);
        return a.filter(m => bIds.indexOf(m.id) >= 0);
    }

}
