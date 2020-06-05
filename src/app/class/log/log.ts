export class Log {
    private _userId: string;
    private _titleLog: string;
    private _type: string;
    private _description: string;
    private _date: string;
    private currentDate: Date;


    constructor(userId: string, titleLog: string, type: string, description: string) {
        this.userId = userId;
        this.titleLog = titleLog;
        this.type = type;
        this.description = description;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

    public get titleLog(): string {
        return this._titleLog;
    }
    public set titleLog(value: string) {
        this._titleLog = value;
    }

    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get date(): string {
        this.currentDate = new Date;
        this._date = (this.currentDate.getDate() + '/' + this.dateCompare((this.currentDate.getMonth() + 1)) + (this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear() + ' ' + this.dateCompare(this.currentDate.getHours()) + this.currentDate.getHours() + ':' + this.dateCompare(this.currentDate.getMinutes()) + this.currentDate.getMinutes() + ':' + this.dateCompare(this.currentDate.getSeconds()) + this.currentDate.getSeconds());
        return this._date;
    }
    private dateCompare(date: number) {
        if (date < 10) { return 0; }
        return '';
    }
}
