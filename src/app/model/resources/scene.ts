import { Photo } from "./photo";
import { Dating } from "./dating";
import { CatalogThesCra } from "./catalog-thes-cra";
import { CatalogLimc } from "./catalog-limc";
import { GraphNode } from "../apiresult/graph-node";

export class Scene {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number;

    public id: number;
    public side: string;
    public description: string;
    public inscription: string;
    public bibliography: string;
    public comment: string;
    public sequence: number;
    public scenename: string[];
    public keyword: string[];
    public url: string[];

    public photo: Photo[] = [];
    public dating: Dating[] = [];
    public catalogThesCRA: CatalogThesCra[] = [];
    public catalogLimc: CatalogLimc[] = [];


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Scene from a GraphNode instance.
     * @param node the graphnode
     * @returns {Scene}
     */
    public static fromGraphNode(node: GraphNode): Scene {

        const scene: Scene = new Scene();

        scene.id = +node.getValues("limc:id")[0];
        scene.side = node.getValues("limc:side")[0];
        scene.description = node.getValues("limc:description")[0];
        scene.inscription = node.getValues("limc:inscription")[0];
        scene.bibliography = node.getValues("limc:bibliography")[0];
        scene.comment = node.getValues("limc:comment")[0];
        scene.sequence = parseInt(node.getValues("limc:sequence")[0], 10);
        scene.scenename = node.getValues("limc:scenename");
        if (scene.scenename && scene.scenename.length > 0) scene.scenename.sort();
        scene.keyword = node.getValues("limc:keyword");
        if (scene.keyword && scene.keyword.length > 0) scene.keyword.sort();
        scene.url = node.getValues("limc:url");
        if (scene.url && scene.url.length > 0) scene.url.sort();

        return scene;

    }

    /**
     * Adds a connection if possible.
     * @param connection
     */
    public addConnection(connection: any) {
        if (connection instanceof Photo) this.photo.push(connection);
        if (connection instanceof Dating) this.dating.push(connection);
        if (connection instanceof CatalogThesCra) this.catalogThesCRA.push(connection);
        if (connection instanceof CatalogLimc) this.catalogLimc.push(connection);
    }

}
