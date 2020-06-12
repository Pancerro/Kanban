export class NewMessage {
    private _friendsId: string;
    private _myEmail: string;
    private _email: string;
  

    constructor(friendsId: string, myEmail: string, email: string) {
        this.friendsId = friendsId;
        this.myEmail = myEmail;
        this.email = email;
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

     public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

}
