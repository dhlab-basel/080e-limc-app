import { GraphNode } from "../apiresult/graph-node";

export class CatalogThesCraChapter {

    ////////////////
    // PROPERTIES //
    ////////////////


    private graphNode: GraphNode;

    public mainChapter: number;
    public name: string;
    public shortName: string;
    public lemata: string;
    public sequence: number;
    public volumenumber: number;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of CatalogThesCraChapter from a GraphNode instance.
     * @param node the graphnode
     * @returns {CatalogThesCraChapter}
     */
    public static fromGraphNode(node: GraphNode): CatalogThesCraChapter {

        let catalogThesCraChapter: CatalogThesCraChapter = new CatalogThesCraChapter();
        catalogThesCraChapter.graphNode = node;

        catalogThesCraChapter.mainChapter = parseInt(node.getValues("limc:mainChapter")[0]);
        catalogThesCraChapter.name = node.getValues("limc:name")[0];
        catalogThesCraChapter.shortName = node.getValues("limc:shortName")[0];
        catalogThesCraChapter.lemata = node.getValues("limc:lemata")[0];
        catalogThesCraChapter.sequence = parseInt(node.getValues("limc:sequence")[0]);
        catalogThesCraChapter.volumenumber = parseInt(node.getValues("limc:volumenumber")[0]);

        return catalogThesCraChapter;

    }

}
