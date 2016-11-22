import { JsonObject, JsonProperty } from "json2typescript";

import { User } from "./user";
import { Graph } from "./graph";
import { Monument } from "../resources/monument";
import { GraphNode } from "./graph-node";
import { Scene } from "../resources/scene";
import { Inventory } from "../resources/inventory";
import { Museum } from "../resources/museum";
import { Epoch } from "../resources/epoch";
import { Dating } from "../resources/dating";
import { CatalogThesCra } from "../resources/catalog-thes-cra";
import { CatalogThesCraChapter } from "../resources/catalog-thes-crachapter";
import { CatalogLimc } from "../resources/catalog-limc";
import { Photo } from "../resources/photo";


@JsonObject
export class GraphData {

    @JsonProperty("graph", Graph)
    public graph: Graph = undefined;

    @JsonProperty("status", Number)
    public status: number = undefined;

    @JsonProperty("userdata", User)
    public user: User = undefined;

    public getMonuments(): Monument[] {

        let monuments: Monument[] = [];
        let scenes: Scene[] = [];
        let inventories: Inventory[] = [];
        let museums: Museum[] = [];
        let epochs: Epoch[] = [];
        let datings: Dating[] = [];
        let catalogThesCras: CatalogThesCra[] = [];
        let catalogThesCraChapters: CatalogThesCraChapter[] = [];
        let catalogLimcs: CatalogLimc[] = [];
        let photos: Photo[] = [];


        for (let key in this.graph.nodes) {

            let node: GraphNode = this.graph.nodes[key];

            switch (node.resinfo.label) {
                case "Monument":
                    monuments.push(Monument.fromGraphNode(node));
                    break;
                case "Scene":
                    scenes.push(Scene.fromGraphNode(node));
                    break;
                case "Inventar":
                    let inventory = Inventory.fromGraphNode(node);
                    inventories.push(inventory);
                    // monument.inventory.push(inventory);
                    break;
                case "Museum":
                    let museum = Museum.fromGraphNode(node);
                    museums.push(museum);
                    // inventory.museum = museum;
                    break;
                case "Epoche":
                    break;
                case "Datierung":
                    break;
                case "Catalog Thes CRA":
                    break;
                case "Catalog Thes CRA Kapitel":
                    break;
                case "Catalog LIMC":
                    break;
                case "Foto":
                    break;
            }
        }

        return monuments;

    }

}