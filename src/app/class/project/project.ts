export class Project {
    private userId: string;
    private projectName: string;
    private share: boolean = false;

    constructor(userId:string,projectName:string,share:boolean){
        this.userId=userId;
        this.projectName=projectName;
        this.share=share;
    }

    public getUserId():string{
        return this.userId;
    }
    public getProjectName():string{
        return this.projectName;
    }
    public getShare():boolean{
        return this.share;
    }

    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setProjectName(projectName:string):void{
        this.projectName=projectName;
    }
    public setShare(share:boolean):void{
        this.share=share;
    }
}
