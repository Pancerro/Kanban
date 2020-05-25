export class StopShareUser {
    private userId: string;
    private friendsEmail: string;
    private friendsId: string;
    private role:string;

    constructor(userId:string,friendsEmail:string,friendsId:string){
        this.userId=userId;
        this.friendsEmail=friendsEmail;
        this.friendsId=friendsId;
        this.role="delete";
    }

    public getUserId():string{
        return this.userId;
    }
    public getFriendsEmail():string{
        return this.friendsEmail;
    }
    public getFriendsId():string{
        return this.friendsId;
    }
    public getRole():string{
        return this.role;
    }
    public setUserId(userId:string):void{
        this.userId=userId;
    }
    public setFriendsEmail(friendsEmail:string):void{
        this.friendsEmail=friendsEmail;
    }
    public setFriendsId(friendsId:string):void{
        this.friendsId=friendsId;
    }
    public setRole():void{
        this.role="delete";
    }
}
