export class UserDate {
    private _userId: string;
    private _email: string;
    private _thema: string;
    private _google: boolean;

    constructor(userId: string, email: string, thema: string, google: boolean) {
        this.userId = userId;
        this.email = email;
        this.thema = thema;
        this.google = google;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get thema(): string {
        return this._thema;
    }
    public set thema(value: string) {
        this._thema = value;
    }

    public get google(): boolean {
        return this._google;
    }
    public set google(value: boolean) {
        this._google = value;
    }
}
