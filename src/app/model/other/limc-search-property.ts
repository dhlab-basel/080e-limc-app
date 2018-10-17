import { SalsahService } from "../service/salsah.service";

import { NodeData } from "../apiresult/node-data";
import { Node } from "../apiresult/node";

export class LimcSearchProperty {

    ////////////////
    // PROPERTIES //
    ////////////////


    /**
     * The resource type id
     */
    resourceTypeId: number;

    /**
     * The id of the property
     */
    propertyId: number;

    /**
     * The name of the property
     */
    propertyName: string;

    /**
     * Optional selection id
     */
    selectionId: number | null;

    /**
     * Selection data if already retrieved
     */
    selectionNodes: NodeData[] = [];


    //////////////////
    // CONSTRUCTORS //
    //////////////////


    /**
     * Creates an instance.
     * @param resourceTypeId
     * @param propertyId
     * @param propertyName
     */
    static create(resourceTypeId: number, propertyId: number, propertyName: string): LimcSearchProperty {

        const property = new LimcSearchProperty();
        property.resourceTypeId = resourceTypeId;
        property.propertyId = propertyId;
        property.propertyName = propertyName;

        return property;

    }

    /**
     * Sets the selection id
     * @param selectionId
     */
    withSelectionId(selectionId: number): LimcSearchProperty {
        this.selectionId = selectionId;
        return this;
    }

    /////////////
    // METHODS //
    /////////////


    /**
     * Fetch the selection nodes if necessary.
     * @param salsahService
     */
    fetchSelectionData(salsahService: SalsahService) {

        if (this.selectionNodes.length > 0 || this.selectionId === null) return;

        salsahService.getSelectionNodes(this.selectionId).subscribe(
            (node: Node) => {
                this.selectionNodes = node.selection;
            },
            (error: any) => {
                this.selectionNodes = [];
            }
        );

    }

}