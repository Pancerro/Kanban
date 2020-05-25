import { MatGridTileHeaderCssMatStyler } from '@angular/material';

export class Task {
    private userId: string;
    private tableParent: string;
    private tableChild: string;
    private title: string;
    private description: string;
    private priority: string;
    private color: string;
    private endDate: string;
    private user: string;

    constructor(userId:string,tableParent:string,tableChild:string,title:string,description:string,priority:string,color:string,endDate:string,user:string){
        this.userId=userId;
        this.tableParent=tableParent;
        this.tableChild=tableChild;
        this.title=title;
        this.description=description;
        this.priority=priority;
        this.color=color;
        this.endDate=endDate;
        this.user=user;
    }

    public getUserId():string{
        return this.userId;
    }
    public getTableParent():string{
        return this.tableParent
    }
    public getTableChild():string{
        return this.tableChild;
    }
    public  getTitle():string{
        return this.title;
    }
    public getDescription():string{
        return this.description;
    }
    public getPriority():string{
        return this.priority;
    }
    public getColor():string{
        return this.color;
    }
    public getEndDate():string{
        return this.endDate;
    }
    public getUser():string{
        return this.user;
    }

    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setTableParent(tableParent:string):void{
        this.tableParent=tableParent;
    }
    public setTableChild(tableChild:string):void{
        this.tableChild=tableChild;
    }
    public setTitle(title:string):void{
        this.title=title;
    }
    public setDescription(description:string):void{
        this.description=description;
    }
    public setPriority(priority:string):void{
        this.priority=priority;
    }
    public setColor(color:string):void{
        this.color=color;
    }
    public setEndDate(endDate:string):void{
        this.endDate=endDate;
    }
    public setUser(user:string):void{
        this.user=user;
    }
}
