export class UserDate {
    private userId: string;
    private email: string;
    public thema: string;
    private google:boolean;

    constructor(userId:string,email:string,thema:string,google:boolean){
        this.userId=userId;
        this.email=email;
        this.thema=thema;
        this.google=google;
    }

    public getUserId():string{
        return this.userId;
    }
    public getEmail():string{
        return this.email;
    }
    public getThema():string{
        return this.thema;
    }
    public getGoogle():boolean{
        return this.google;
    }
    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setEmail(email:string):void{
        this.email=email;
    }
    public setThema(thema:string):void{
        this.thema=thema;
    }
    public setGoogle(google:boolean):void{
        this.google=google;
    }
}
