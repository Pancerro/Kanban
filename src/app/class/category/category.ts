export class Category {
    private userId: string;
    private category: string;
    private color: string;

    constructor(userId:string,category:string,color:string){
        this.userId=userId;
        this.category=category;
        this.color=color;
    }

    public getUserId():string{
        return this.userId;
    }
    public getCategory():string{
        return this.category;
    }
    public getColor():string{
        return this.color;
    }
    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setCategory(category:string):void{
        this.category=category;
    }
    public setColor(color:string):void{
        this.color=color;
    }
}
