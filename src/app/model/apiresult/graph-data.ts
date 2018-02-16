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
        const resourcesById: any[] = [];

        const monuments: Monument[] = [];

        for (const key in this.graph.nodes) {

            const node: GraphNode = this.graph.nodes[key];
            //node.obj_id = key;

            switch (node.resInfo.label) {
                case "Monument":
                    const monument = Monument.fromGraphNode(node);
                    monuments.push(monument);
                    resourcesById[key] = monument;
                    break;
                case "Szene":
                    const scene = Scene.fromGraphNode(node);
                    resourcesById[key] = scene;
                    break;
                case "Inventar":
                    const inventory = Inventory.fromGraphNode(node);
                    resourcesById[key] = inventory;
                    break;
                case "Museum":
                    const museum = Museum.fromGraphNode(node);
                    resourcesById[key] = museum;
                    break;
                case "Epoche":
                    const epoch = Epoch.fromGraphNode(node);
                    resourcesById[key] = epoch;
                    break;
                case "Datierung":
                    const dating = Dating.fromGraphNode(node);
                    resourcesById[key] = dating;
                    break;
                case "Catalog Thes CRA":
                    const catalogThesCra = CatalogThesCra.fromGraphNode(node);
                    resourcesById[key] = catalogThesCra;
                    break;
                case "Catalog Thes CRA Kapitel":
                    const catalogThesCraChapter = CatalogThesCraChapter.fromGraphNode(node);
                    resourcesById[key] = catalogThesCraChapter;
                    break;
                case "Catalog LIMC":
                    const catalogLimc = CatalogLimc.fromGraphNode(node);
                    resourcesById[key] = catalogLimc;
                    break;
                case "Foto":
                    const photo = Photo.fromGraphNode(node);
                    resourcesById[key] = photo;
                    break;
                default:
                    break;
            }

        }

        // Make all connections
        for (const key in this.graph.edges) {

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

}
