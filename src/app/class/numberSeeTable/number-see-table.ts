export class NumberSeeTable {
    private userId: string;
    private number: number;

    constructor(userId:string,number:number){
        this.userId=userId;
        this.number=number;
    }

    public getUserId():string{
        return this.userId;
    }
    public getNumber():number{
        return this.number;
    }
    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setNumber(number:number):void{
        this.number=number;
    }
}
