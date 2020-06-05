export class TableTitle {
    private _userId: string;
    private _tableChild: string;
    private _title: string;

    constructor(userId: string, tableChild: string, title: string) {
        this.userId = userId;
        this.tableChild = tableChild;
        this.title = title;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get tableChild(): string {
        return this._tableChild;
    }
    public set tableChild(value: string) {
        this._tableChild = value;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

}
