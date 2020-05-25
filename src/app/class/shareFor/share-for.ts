export class ShareFor {
    private friendsId: string;
    private userId: string;
    private projectName: string;

    constructor(friendsId:string,userId:string,projectName:string){
        this.friendsId=friendsId;
        this.userId=userId;
        this.projectName=projectName;
    }

    public getFriendsId():string{
        return this.friendsId;
    }
    public getUserId():string{
        return this.userId;
    }
    public getProjectName():string{
        return this.projectName;
    }

    public setFriendsId(friendsId:string):void{
        this.friendsId=friendsId;
    }
    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setProjectName(projectName:string):void{
        this.projectName=projectName;
    }
}
