export class ChatWithFriend {
    private myId: string;
    private friendsId: string;
    private myEmail: string;
    private friendsEmail: string;
    private data: string;
    private message: string;
    private userName: string;

    constructor(myId:string,friendsId:string,myEmail:string,friendsEmail:string,data:string,message:string,userName:string){
        this.myId=myId;
        this.friendsId=friendsId;
        this.myEmail=myEmail;
        this.friendsEmail=friendsEmail;
        this.data=data;
        this.message=message;
        this.userName=userName;
    }

    public getMyId():string{
        return this.myId;
    }
    public getFriendsId():string{
        return this.friendsId;
    }
    public getMyEmail():string{
        return this.myEmail;
    }
    public getFriendsEmail():string{
        return this.friendsEmail;
    }
    public getData():string{
        return this.data;
    }
    public getMessage():string{
        return this.message;
    }
    public getUserName():string{
        return this.userName;
    }

    public setMyId(myId:string):void{
        this.myId=myId;
    }
    public setFriendsId(friendsId:string):void{
        this.friendsId=friendsId;
    }
    public setMyEmail(myEmail:string):void{
        this.myEmail=myEmail;
    }
    public setData(data:string):void{
        this.data=data;
    }
    public setMessage(message:string):void{
        this.message=message;
    }
    public setUserName(userName:string):void{
        this.userName=userName;
    }
}
