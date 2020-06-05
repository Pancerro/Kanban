export class ShareFriend {
    private _userId: string;
    private _friendsEmail: string;
    private _friendsId: string;
    private _role: string;

    constructor(userId: string, friendsEmail: string, friendsId: string, role: string) {
        this.userId = userId;
        this.friendsEmail = friendsEmail;
        this.friendsId = friendsId;
        this.role = role;
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

    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }


}

