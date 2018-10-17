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
import { CatalogThesCraChapter } from "../resources/catalog-thes-cra-chapter";
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

}
