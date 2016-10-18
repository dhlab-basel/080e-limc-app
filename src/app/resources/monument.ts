import { Inventory } from "./inventory";
import { Scene } from "./scene";
import { Dating } from "./dating";
/**
 * Monument class.
 */
export class Monument {

    ////////////////
    // PROPERTIES //
    ////////////////


    public id: number;
    public discovery: string;
    public discoveryDetail: string[];
    public object: string;
    public material: string;
    public origin: string;
    public country: string;
    public artist: string[];
    public category: string[];
    public technique: string[];
    public keyword: string[];
    public scenename: string[];
    public dimension: string;
    public description: string;
    public inscription: string;
    public bibliography: string;
    public comment: string;
    public dating: Dating[];
    public scene: Scene[];
    public inventory: Inventory[];


    /////////////
    // METHODS //
    /////////////


}