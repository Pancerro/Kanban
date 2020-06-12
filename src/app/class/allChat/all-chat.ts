export class AllChat {
    private _myId: string;
    private _email: string;
    private _projectName: string;
    private _data: Object;
    private _message: string;

    constructor(myId: string, email: string, projectName: string, data: Object, message: string) {
        this.myId = myId;
        this.email = email;
        this.projectName = projectName;
        this.data = data;
        this.message = message;
    }
    public get myId(): string {
        return this._myId;
    }
    public set myId(value: string) {
        this._myId = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get projectName(): string {
        return this._projectName;
    }
    public set projectName(value: string) {
        this._projectName = value;
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

}
