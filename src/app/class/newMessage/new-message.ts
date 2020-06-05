export class NewMessage {
    private _friendsId: string;
    private _myEmail: string;
    private _userName: string;

    constructor(friendsId: string, myEmail: string, userName: string) {
        this.friendsId = friendsId;
        this.myEmail = myEmail;
        this.userName = userName;
    }
    public get friendsId(): string {
        return this._friendsId;
    }
    public set friendsId(value: string) {
        this._friendsId = value;
    }

    public get myEmail(): string {
        return this._myEmail;
    }
    public set myEmail(value: string) {
        this._myEmail = value;
    }

    public get userName(): string {
        return this._userName;
    }
    public set userName(value: string) {
        this._userName = value;
    }

}
