import { CatalogThesCraChapter } from "./catalog-thes-cra-chapter";
import { GraphNode } from "../apiresult/graph-node";

export class CatalogThesCra {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number;

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

        const catalogThesCra: CatalogThesCra = new CatalogThesCra();

        catalogThesCra.indexnumber = parseInt(node.getValues("limc:indexnumber")[0], 10);
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
