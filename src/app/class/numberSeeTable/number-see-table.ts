export class NumberSeeTable {
    private _userId: string;
    private _number: number;

    constructor(userId: string, number: number) {
        this.userId = userId;
        this.number = number;
    }

    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get number(): number {
        return this._number;
    }
    public set number(value: number) {
        this._number = value;
    }
}
