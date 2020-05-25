export class Log {
    private userId: string;
    private titleLog: string;
    private type: string;
    private description: string;
    private date:string;
    private currentDate:Date;
    constructor(userId: string,titleLog: string,type: string,description: string){
        this.userId=userId;
        this.titleLog=titleLog;
        this.type=type;
        this.description=description;
    }

    public getUserId():string{
        return this.userId;
    }
    public getTitleLog():string{
        return this.titleLog;
    }
    public getType():string{
        return this.type;
    }
    public getDescription():string{
        return this.description;
    }
    public getDate():string{
        this.currentDate = new Date;
        this.date = (this.currentDate.getDate() + '/' + this.dateCompare((this.currentDate.getMonth() + 1)) + (this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear() + ' ' + this.dateCompare(this.currentDate.getHours()) + this.currentDate.getHours() + ':' + this.dateCompare(this.currentDate.getMinutes()) + this.currentDate.getMinutes() + ':' + this.dateCompare(this.currentDate.getSeconds()) + this.currentDate.getSeconds());
        return this.date;
    }
    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setTitleLog(titleLog:string):void{
        this.titleLog=titleLog;
    }
    public setType(type:string):void{
        this.type=type;
    }
    public setDescription(description:string):void{
        this.description=description;
    }
    private dateCompare(date: number) {
        if (date < 10) { return 0; }
        return '';
      }
}
