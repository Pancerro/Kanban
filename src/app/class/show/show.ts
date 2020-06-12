export class Show {
    private _text: string;
    private _see: boolean;
    constructor(text: string, see: boolean) {
        this.text = text;
        this.see = see;
    }
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }

    public get see(): boolean {
        return this._see;
    }
    public set see(value: boolean) {
        this._see = value;
    }
}
