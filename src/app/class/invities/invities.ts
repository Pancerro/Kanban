export class Invities {
    private userId: string;
    private friendsEmail: string;
    private friendsId: string;
    private accept: boolean;

    constructor(userId:string,friendsEmail:string,friendsId:string,accept:boolean){
        this.userId=userId;
        this.friendsEmail=friendsEmail;
        this.friendsId=friendsId;
        this.accept=accept;
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
    public getAccept():boolean{
        return this.accept;
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
    public setAccept(accept:boolean):void{
        this.accept=accept;
    }
}
