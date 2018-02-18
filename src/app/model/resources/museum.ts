import { GraphNode } from "../apiresult/graph-node";

export class Museum {

    ////////////////
    // PROPERTIES //
    ////////////////


    public resourceId: number;

    public country: string;
    public city: string;
    public name: string;
    public director: string;
    public salutation: string;
    public address: string;
    public postBox: string;
    public zip: string;
    public email: string;
    public fax: string;
    public contactCenter: string;
    public contactCenterCity: string;
    public photoCredit: string;
    public comment: string;
    public hasPhotoRight: boolean;

    public latitude: number;
    public longitude: number;


    /////////////
    // METHODS //
    /////////////


    /**
     * Gets an instance of Museum from a GraphNode instance.
     * @param node the graphnode
     * @returns {Scene}
     */
    public static fromGraphNode(node: GraphNode): Museum {

        const museum: Museum = new Museum();

        museum.country = node.getValues("limc:country")[0];
        museum.city = node.getValues("limc:city")[0];
        museum.name = node.getValues("limc:name")[0];
        museum.director = node.getValues("limc:director")[0];
        museum.salutation = node.getValues("limc:salutation")[0];
        museum.address = node.getValues("limc:address")[0];
        museum.postBox = node.getValues("limc:postBox")[0];
        museum.zip = node.getValues("limc:zip")[0];
        museum.email = node.getValues("limc:email")[0];
        museum.fax = node.getValues("limc:fax")[0];
        museum.contactCenter = node.getValues("limc:contactCenter")[0];
        museum.contactCenterCity = node.getValues("limc:contactCenterCity")[0];
        museum.photoCredit = node.getValues("limc:photoCredit")[0];
        museum.comment = node.getValues("limc:comment")[0];
        museum.hasPhotoRight = node.getValues("limc:hasPhotoRight")[0] === "1";

        return museum;

    }

    /**
     * Gets the address as one line string.
     * @returns {string}
     */
    public getAddress() {
        return this.city + "," + this.country;
    }

}
