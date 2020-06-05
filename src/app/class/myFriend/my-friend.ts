export class MyFriend {
    private _userId: string;
    private _friendsEmail: string;
    private _friendsId: string;
    private _accept: boolean;

    constructor(userId: string, friendsEmail: string, friendsId: string, accept: boolean) {
        this.userId = userId;
        this.friendsEmail = friendsEmail;
        this.friendsId = friendsId;
        this.accept = accept;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get friendsEmail(): string {
        return this._friendsEmail;
    }
    public set friendsEmail(value: string) {
        this._friendsEmail = value;
    }

    public get friendsId(): string {
        return this._friendsId;
    }
    public set friendsId(value: string) {
        this._friendsId = value;
    }

    public get accept(): boolean {
        return this._accept;
    }
    public set accept(value: boolean) {
        this._accept = value;
    }
}
