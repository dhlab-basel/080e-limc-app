import { Inventory } from "./inventory";
import { Scene } from "./scene";
import { Dating } from "./dating";
import { GraphNode } from "../apiresult/graph-node";
import { Photo } from "./photo";
import { Museum } from "./museum";
import { Epoch } from "./epoch";
import { CatalogThesCraChapter } from "./catalog-thes-cra-chapter";
import { CatalogThesCra } from "./catalog-thes-cra";
import { CatalogLimc } from "./catalog-limc";
import { Graph } from "../apiresult/graph";
import { SalsahService } from "../service/salsah.service";


/**
 * Monument class.
 */
export class Monument {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number;
    public handleId: string;

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
    public monumentUrl: string[];
    public inscriptionUrl: string[];
    public museumUrl: string[];

    public dating: Dating[] = [];
    public scene: Scene[] = [];
    public inventory: Inventory[] = [];


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an array of instances of Monument from a Graph instance.
     * @param graph
     * @returns {Monument[]}
     */
    public static fromGraph(graph: Graph): Monument[] {

        // Save all instances
        const resourcesById: any[] = [];

        const monuments: Monument[] = [];

        for (const key of Object.keys(graph.nodes)) {

            const node: GraphNode = graph.nodes[key];

            switch (node.resInfo.label) {
                case "Monument":
                    const monument = Monument.fromGraphNode(node);
                    monument.resourceId = +key;
                    monument.handleId = node.resInfo.handleId;
                    monuments.push(monument);
                    resourcesById[key] = monument;
                    break;
                case "Szene":
                    const scene = Scene.fromGraphNode(node);
                    scene.resourceId = +key;
                    resourcesById[key] = scene;
                    break;
                case "Inventar":
                    const inventory = Inventory.fromGraphNode(node);
                    inventory.resourceId = +key;
                    resourcesById[key] = inventory;
                    break;
                case "Museum":
                    const museum = Museum.fromGraphNode(node);
                    museum.resourceId = +key;
                    resourcesById[key] = museum;
                    break;
                case "Epoche":
                    const epoch = Epoch.fromGraphNode(node);
                    epoch.resourceId = +key;
                    resourcesById[key] = epoch;
                    break;
                case "Datierung":
                    const dating = Dating.fromGraphNode(node);
                    dating.resourceId = +key;
                    resourcesById[key] = dating;
                    break;
                case "Catalog Thes CRA":
                    const catalogThesCra = CatalogThesCra.fromGraphNode(node);
                    catalogThesCra.resourceId = +key;
                    resourcesById[key] = catalogThesCra;
                    break;
                case "Catalog Thes CRA Kapitel":
                    const catalogThesCraChapter = CatalogThesCraChapter.fromGraphNode(node);
                    catalogThesCraChapter.resourceId = +key;
                    resourcesById[key] = catalogThesCraChapter;
                    break;
                case "Catalog LIMC":
                    const catalogLimc = CatalogLimc.fromGraphNode(node);
                    catalogLimc.resourceId = +key;
                    resourcesById[key] = catalogLimc;
                    break;
                case "Foto":
                    const photo = Photo.fromGraphNode(node);
                    photo.resourceId = +key;
                    photo.setUrl();
                    resourcesById[key] = photo;
                    break;
                default:
                    break;
            }

        }

        // Make all connections
        for (const key of Object.keys(graph.edges)) {

            const split = key.split(";");

            if (split.length !== 2) continue;

            const obj_id_from = split[0];
            const obj_id_to = split[1];

            if (typeof resourcesById[obj_id_from] !== "undefined" && typeof resourcesById[obj_id_from].addConnection === "function") {
                resourcesById[obj_id_from].addConnection(resourcesById[obj_id_to]);
            }
            if (typeof resourcesById[obj_id_to] !== "undefined" && typeof resourcesById[obj_id_to].addConnection === "function") {
                resourcesById[obj_id_to].addConnection(resourcesById[obj_id_from]);
            }

        }

        // Return it
        return monuments;

    }

    /**
     * Gets an instance of Monument from a GraphNode instance.
     * @param node the graphnode
     * @returns {Monument}
     */
    public static fromGraphNode(node: GraphNode): Monument {

        const monument: Monument = new Monument();

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
        monument.monumentUrl = node.getValues("limc:monumentUrl");
        monument.inscriptionUrl = node.getValues("limc:inscriptionUrl");
        monument.museumUrl = node.getValues("limc:museumUrl");

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
     * @returns the photos that are allowed for display
     */
    public getPhotos(): Photo[] {

        if (this.inventory === null) return [];

        const museums: Museum[] = this.inventory.map(i => i.museum);
        const hasPhotoRights: boolean = museums.findIndex(m => m.hasPhotoRight === false) < 0;

        const photos: Photo[] = [];

        for (const scene of this.scene) {
            for (const photo of scene.photo) {

                if (photo.newPhoto === false) continue;

                if (photo.hasPhotoRight === true || (photo.hasPhotoRight === null && hasPhotoRights)) {
                    photos.push(photo);
                }

            }
        }

        return photos;

    }

    /**
     * Gets a photo of a monument.
     * @returns the first photo that is allowed for display
     */
    public getPhoto(): Photo {

        const photos: Photo[] = this.getPhotos();
        if (photos.length > 0) return photos[0];

        const p: Photo = new Photo();
        p.url = "assets/img/default_gray.jpg";
        p.thumbnailUrl = "assets/img/default_gray.jpg";

        return p;

    }

}
