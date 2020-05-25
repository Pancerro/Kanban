export class AllChat {
    private myId: string;
    private email: string;
    private projectName: string;
    private data: string;
    private message: string;

    constructor(myId:string,email:string,projectName:string,data:string,message:string){
        this.myId=myId;
        this.email=email;
        this.projectName=projectName;
        this.data=data;
        this.message=message;
    }

    public getMyId():string{
        return this.myId;
    }
    public getEmail():string{
        return this.email;
    }
    public getProjectName():string{
        return this.projectName;
    }
    public getData():string{
        return this.data;
    }
    public getMessage():string{
        return this.message;
    }

    public setMyId(myId:string):void{
        this.myId=myId;
    }
    public setEmail(email:string):void{
        this.email=email;
    }
    public setProjectName(projectName:string):void{
        this.projectName=projectName;
    }
    public setData(data:string):void{
        this.data=data;
    }
    public setMessage(message:string):void{
        this.message=message;
    }
}
