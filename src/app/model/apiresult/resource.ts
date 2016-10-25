import { User } from "./user";
import { ResourceInfo } from "./resource-info";
import { ResourceData } from "./resource-data";

export abstract class Resource {
    public resinfo: ResourceInfo;
    public resdata: ResourceData;
    public props: any;
    public incoming: any[];
    public access: string;
    public status: number;
    public user: User;
}