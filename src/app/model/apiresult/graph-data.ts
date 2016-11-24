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

        // Save all instances
        let resourcesById: any[] = [];

        let monuments: Monument[] = [];

        for (let key in this.graph.nodes) {

            let node: GraphNode = this.graph.nodes[key];
            node.obj_id = key;

            switch (node.resinfo.label) {
                case "Monument":
                    let monument = Monument.fromGraphNode(node);
                    monuments.push(monument);
                    resourcesById[key] = monument;
                    break;
                case "Szene":
                    let scene = Scene.fromGraphNode(node);
                    resourcesById[key] = scene;
                    break;
                case "Inventar":
                    let inventory = Inventory.fromGraphNode(node);
                    resourcesById[key] = inventory;
                    break;
                case "Museum":
                    let museum = Museum.fromGraphNode(node);
                    resourcesById[key] = museum;
                    break;
                case "Epoche":
                    let epoch = Epoch.fromGraphNode(node);
                    resourcesById[key] = epoch;
                    break;
                case "Datierung":
                    let dating = Dating.fromGraphNode(node);
                    resourcesById[key] = dating;
                    break;
                case "Catalog Thes CRA":
                    let catalogThesCra = CatalogThesCra.fromGraphNode(node);
                    resourcesById[key] = catalogThesCra;
                    break;
                case "Catalog Thes CRA Kapitel":
                    let catalogThesCraChapter = CatalogThesCraChapter.fromGraphNode(node);
                    resourcesById[key] = catalogThesCraChapter;
                    break;
                case "Catalog LIMC":
                    let catalogLimc = CatalogLimc.fromGraphNode(node);
                    resourcesById[key] = catalogLimc;
                    break;
                case "Foto":
                    let photo = Photo.fromGraphNode(node);
                    resourcesById[key] = photo;
                    break;
                default:
                    break;
            }

        }

        // Make all connections
        for (let key in this.graph.edges) {

            let split = key.split(";");

            if (split.length !== 2) continue;

            let obj_id_from = split[0];
            let obj_id_to = split[1];

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

}