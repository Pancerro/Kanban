export class ShareFor {
    private _friendsId: string;
    private _userId: string;
    private _projectName: string;

    constructor(friendsId: string, userId: string, projectName: string) {
        this.friendsId = friendsId;
        this.userId = userId;
        this.projectName = projectName;
    }
    public get friendsId(): string {
        return this._friendsId;
    }
    public set friendsId(value: string) {
        this._friendsId = value;
    }

    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get projectName(): string {
        return this._projectName;
    }
    public set projectName(value: string) {
        this._projectName = value;
    }
}
