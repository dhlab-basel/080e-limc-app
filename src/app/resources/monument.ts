/**
 * Monument class.
 */
export class Monument {

    ////////////////
    // PROPERTIES //
    ////////////////


    private _id: number;
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    private _discovery: string;
    get discovery(): string {
        return this._discovery;
    }
    set discovery(value: string) {
        this._discovery = value;
    }

    private _discoveryDetail: string[];
    get discoveryDetail(): string[] {
        return this._discoveryDetail;
    }
    set discoveryDetail(value: string[]) {
        this._discoveryDetail = value;
    }

    private _object: string;
    get object(): string {
        return this._object;
    }
    set object(value: string) {
        this._object = value;
    }

    private _material: string;
    get material(): string {
        return this._material;
    }
    set material(value: string) {
        this._material = value;
    }

    private _origin: string;
    get origin(): string {
        return this._origin;
    }
    set origin(value: string) {
        this._origin = value;
    }

    private _country: string;
    get country(): string {
        return this._country;
    }
    set country(value: string) {
        this._country = value;
    }

    private _artist: string[];
    get artist(): string[] {
        return this._artist;
    }
    set artist(value: string[]) {
        this._artist = value;
    }

    private _category: string[];
    get category(): string[] {
        return this._category;
    }
    set category(value: string[]) {
        this._category = value;
    }

    private _technique: string[];
    get technique(): string[] {
        return this._technique;
    }
    set technique(value: string[]) {
        this._technique = value;
    }

    private _keyword: string[];
    get keyword(): string[] {
        return this._keyword;
    }
    set keyword(value: string[]) {
        this._keyword = value;
    }

    private _scenename: string[];
    get scenename(): string[] {
        return this._scenename;
    }
    set scenename(value: string[]) {
        this._scenename = value;
    }

    private _dimension: string;
    get dimension(): string {
        return this._dimension;
    }
    set dimension(value: string) {
        this._dimension = value;
    }

    private _description: string;
    get description(): string {
        return this._description;
    }
    set description(value: string) {
        this._description = value;
    }

    private _inscription: string;
    get inscription(): string {
        return this._inscription;
    }
    set inscription(value: string) {
        this._inscription = value;
    }

    private _bibliography: string;
    get bibliography(): string {
        return this._bibliography;
    }
    set bibliography(value: string) {
        this._bibliography = value;
    }

    private _comment: string;
    get comment(): string {
        return this._comment;
    }
    set comment(value: string) {
        this._comment = value;
    }

    private _dating: any[];
    get dating(): any[] {
        return this._dating;
    }
    set dating(value: any[]) {
        this._dating = value;
    }

    private _scene: any[];
    get scene(): any[] {
        return this._scene;
    }
    set scene(value: any[]) {
        this._scene = value;
    }

    private _inventory: any[];
    get inventory(): any[] {
        return this._inventory;
    }
    set inventory(value: any[]) {
        this._inventory = value;
    }


    /////////////
    // METHODS //
    /////////////


}