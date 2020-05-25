export class AllUser {
    private userId: string;
    private email: string;
    private online: boolean;

    constructor(userId:string,email:string,online:boolean){
        this.userId=userId;
        this.email=email;
        this.online=online;
    }

    public getUserId():string{
        return this.userId;
    }
    public getEmail():string{
        return this.email;
    }
    public getOnline():boolean{
        return this.online;
    }

    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setEmail(email:string):void{
        this.email=email;
    }
    public setOnline(online:boolean):void{
        this.online=online;
    }
}
