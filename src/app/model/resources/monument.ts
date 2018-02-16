import { Inventory } from "./inventory";
import { Scene } from "./scene";
import { Dating } from "./dating";
import { GraphNode } from "../apiresult/graph-node";
import { Photo } from "./photo";
import { Resource } from "../apiresult/resource";


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
    public url: string[];

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

        const monument: Monument = new Monument();
        monument.graphNode = node;

        monument.id = +node.getValues("limc:id")[0];
        monument.discovery = node.getValues("limc:discovery")[0]
        monument.discoveryDetail = node.getValues("limc:discoveryDetail");
        monument.object = node.getValues("limc:object")[0];
        monument.material = node.getValues("limc:material")[0];
        monument.origin = node.getValues("limc:origin")[0];
        monument.country = node.getValues("limc:country")[0];
        monument.artist = node.getValues("limc:artist");
        monument.category = node.getValues("limc:category");
        monument.technique = node.getValues("limc:technique");
        monument.keyword = node.getValues("limc:keyword");
        if (monument.keyword && monument.keyword.length > 0) monument.keyword.sort();
        monument.scenename = node.getValues("limc:scenename");
        if (monument.scenename && monument.scenename.length > 0) monument.scenename.sort();
        monument.dimension = node.getValues("limc:dimension")[0];
        monument.description = node.getValues("limc:description")[0];
        monument.inscription = node.getValues("limc:inscription")[0];
        monument.bibliography = node.getValues("limc:bibliography")[0];
        monument.comment = node.getValues("limc:comment")[0];
        monument.url = node.getValues("limc:url");
        if (monument.url && monument.url.length > 0) monument.url.sort();

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

    /**
     * Gets all photos of a monument.
     * @returns {Photo[]}
     */
    public getPhotos() {

        const photos: Photo[] = [];

        // this.inventory[0].museum.hasPhotoRight

        for (const scene of this.scene) {
            for (const photo of scene.photo) {
                // TODO CHECK IF PHOTORIGHT GIVEN
                photos.push(photo);
                console.log(photo.url);
            }
        }

        return photos;

    }

    /**
     * Gets a photo of a monument.
     * @returns {Photo}
     */
    public getPhoto(): Photo {

        if (this.inventory[0].museum.hasPhotoRight) {
            const photos: Photo[] = this.getPhotos();
            if (photos.length > 0) return photos[0];
        }

        let p = new Photo();
        p.url = "assets/img/default.jpg";

        return p;

    }

}