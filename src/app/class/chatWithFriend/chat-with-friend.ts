export class ChatWithFriend {
    private _myId: string;
    private _friendsId: string;
    private _myEmail: string;
    private _friendsEmail: string;
    private _data: Object;
    private _message: string;
    private _email: string;



    constructor(myId: string, friendsId: string, myEmail: string, friendsEmail: string, data: Object, message: string, email: string) {
        this.myId = myId;
        this.friendsId = friendsId;
        this.myEmail = myEmail;
        this.friendsEmail = friendsEmail;
        this.data = data;
        this.message = message;
        this.email=email;

    }
    public get myId(): string {
        return this._myId;
    }
    public set myId(value: string) {
        this._myId = value;
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

    public get friendsEmail(): string {
        return this._friendsEmail;
    }
    public set friendsEmail(value: string) {
        this._friendsEmail = value;
    }

    public get data(): Object {
        return this._data;
    }
    public set data(value: Object) {
        this._data = value;
    }

    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
}
