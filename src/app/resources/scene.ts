import { Photo } from "./photo";
import { Dating } from "./dating";
import { CatalogThesCra } from "./catalog-thes-cra";
import { CatalogLimc } from "./catalog-limc";

export class Scene {
    public id: number;
    public side: string;
    public description: string;
    public inscription: string;
    public bibliography: string;
    public comment: string;
    public sequence: number;
    public scenename: string[];
    public keyword: string[];
    public photo: Photo[];
    public dating: Dating[];
    public catalogThesCRA: CatalogThesCra[];
    public catalogLimc: CatalogLimc
}
