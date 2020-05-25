export class NewMessage {
    private friendsId: string;
    private myEmail: string;
    private userName: string;

    constructor(friendsId:string,myEmail:string,userName:string){
        this.friendsId=friendsId;
        this.myEmail=myEmail;
        this.userName=userName;
    }

    public getFriendsId():string{
        return this.friendsId;
    }
    public getMyEmail():string{
        return this.myEmail;
    }
    public getUserName():string{
        return this.userName;
    }

    public setFriendsId(friendsId:string):void{
        this.friendsId=friendsId;
    }
    public setMyEmail(myEmail:string):void{
        this.myEmail=myEmail;
    }
    public setUserName(userName:string):void{
        this.userName=userName;
    }
}
