export class AllUser {
    private _userId: string;
    private _email: string;
    private _online: boolean;

    constructor(userId: string, email: string, online: boolean) {
        this.userId = userId;
        this.email = email;
        this.online = online;
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

    public get online(): boolean {
        return this._online;
    }
    public set online(value: boolean) {
        this._online = value;
    }
}
