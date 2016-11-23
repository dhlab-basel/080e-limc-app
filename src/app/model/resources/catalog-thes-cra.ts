import { CatalogThesCraChapter } from "./catalog-thes-crachapter";
import { GraphNode } from "../apiresult/graph-node";

export class CatalogThesCra {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

    public indexnumber: number;
    public asterix: boolean;
    public dot: boolean;

    public catalogThesCraChapter: CatalogThesCraChapter;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of CatalogThesCra from a GraphNode instance.
     * @param node the graphnode
     * @returns {CatalogThesCra}
     */
    public static fromGraphNode(node: GraphNode): CatalogThesCra {

        let catalogThesCra: CatalogThesCra = new CatalogThesCra();
        catalogThesCra.graphNode = node;

        catalogThesCra.indexnumber = parseInt(node.getValues("limc:indexnumber")[0]);
        catalogThesCra.asterix = node.getValues("limc:asterix")[0] === "1";
        catalogThesCra.dot = node.getValues("limc:dot")[0] === "1";

        return catalogThesCra;

    }

    /**
     * Adds a connection if possible.
     * @param connection
     */
    public addConnection(connection: any) {
        if (connection instanceof CatalogThesCraChapter) this.catalogThesCraChapter = connection;
    }

}
