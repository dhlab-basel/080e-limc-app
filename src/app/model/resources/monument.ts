import { Inventory } from "./inventory";
import { Scene } from "./scene";
import { Dating } from "./dating";
import { GraphNode } from "../apiresult/graph-node";


/**
 * Monument class.
 */
export class Monument {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

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

    public dating: Dating[] = [];
    public scene: Scene[] = [];
    public inventory: Inventory[] = [];


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Monument from a GraphNode instance.
     * @param node the graphnode
     * @returns {Monument}
     */
    public static fromGraphNode(node: GraphNode): Monument {

        let monument: Monument = new Monument();
        monument.graphNode = node;
        
        monument.id = +node.getValues("limc:id")[0];
        monument.discovery = node.getValues("limc:discovery")[0]
        monument.discoveryDetail = node.getValues("limc:");
        monument.object = node.getValues("limc:object")[0];
        monument.material = node.getValues("limc:material")[0];
        monument.origin = node.getValues("limc:origin")[0];
        monument.country = node.getValues("limc:country")[0];
        monument.artist = node.getValues("limc:artist");
        monument.category = node.getValues("limc:category");
        monument.technique = node.getValues("limc:technique");
        monument.keyword = node.getValues("limc:keyword");
        monument.scenename = node.getValues("limc:scenename");
        monument.dimension = node.getValues("limc:dimension")[0];
        monument.description = node.getValues("limc:description")[0];
        monument.inscription = node.getValues("limc:inscription")[0];
        monument.bibliography = node.getValues("limc:bibliography")[0];
        monument.comment = node.getValues("limc:comment")[0];

        return monument;

    }

    /**
     * Adds a connection if possible.
     * @param connection
     */
    public addConnection(connection: any) {
        if (connection instanceof Dating) this.dating.push(connection);
        if (connection instanceof Scene) this.scene.push(connection);
        if (connection instanceof Inventory) this.inventory.push(connection);
    }

}