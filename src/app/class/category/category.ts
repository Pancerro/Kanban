export class Category {
    private _userId: string;
    private _category: string;
    private _color: string;

    constructor(userId: string, category: string, color: string) {
        this.userId = userId;
        this.category = category;
        this.color = color;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get category(): string {
        return this._category;
    }
    public set category(value: string) {
        this._category = value;
    }

    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }
}
