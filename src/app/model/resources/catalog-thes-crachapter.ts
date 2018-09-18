import { GraphNode } from "../apiresult/graph-node";

export class CatalogThesCraChapter {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number;

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

        const catalogThesCraChapter: CatalogThesCraChapter = new CatalogThesCraChapter();

        catalogThesCraChapter.mainChapter = parseInt(node.getValues("limc:mainChapter")[0], 10);
        catalogThesCraChapter.name = node.getValues("limc:name")[0];
        catalogThesCraChapter.shortName = node.getValues("limc:shortName")[0];
        catalogThesCraChapter.lemata = node.getValues("limc:lemata")[0];
        catalogThesCraChapter.sequence = parseInt(node.getValues("limc:sequence")[0], 10);
        catalogThesCraChapter.volumenumber = parseInt(node.getValues("limc:volumenumber")[0], 10);

        return catalogThesCraChapter;

    }

}
