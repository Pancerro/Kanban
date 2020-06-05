export class Project {
    private _userId: string;
    private _projectName: string;
    private _share: boolean

    constructor(userId: string, projectName: string, share: boolean) {
        this.userId = userId;
        this.projectName = projectName;
        this.share = share;
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

    public get share(): boolean {
        return this._share;
    }
    public set share(value: boolean) {
        this._share = value;
    }
}
