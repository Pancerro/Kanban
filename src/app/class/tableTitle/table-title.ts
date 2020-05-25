export class TableTitle {
    private userId: string;
    private tableChild: string;
    private title: string;

    constructor(userId:string,tableChild:string,title:string){
        this.userId=userId;
        this.tableChild=tableChild;
        this.title=title;
    }

    public getUserId():string{
        return this.userId;
    }
    public getTableChild():string{
        return this.tableChild;
    }
    public getTitle():string{
        return this.title;
    }

    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setTableChild(tableChild:string):void{
        this.tableChild=tableChild;
    }
    public setTitle(title:string):void{
        this.title=title;
    }
}
