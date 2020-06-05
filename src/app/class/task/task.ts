

export class Task {
    private _userId: string;
    private _tableParent: string;
    private _tableChild: string;
    private _title: string;
    private _description: string;
    private _priority: string;
    private _color: string;
    private _endDate: string;
    private _user: string;
    
    constructor(userId: string, tableParent: string, tableChild: string, title: string, description: string, priority: string, color: string, endDate: string, user: string) {
        this.userId = userId;
        this.tableParent = tableParent;
        this.tableChild = tableChild;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.color = color;
        this.endDate = endDate;
        this.user = user;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get tableParent(): string {
        return this._tableParent;
    }
    public set tableParent(value: string) {
        this._tableParent = value;
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

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get priority(): string {
        return this._priority;
    }
    public set priority(value: string) {
        this._priority = value;
    }
    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }

    public get endDate(): string {
        return this._endDate;
    }
    public set endDate(value: string) {
        this._endDate = value;
    }

    public get user(): string {
        return this._user;
    }
    public set user(value: string) {
        this._user = value;
    }
}
