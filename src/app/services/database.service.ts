import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  date:Date= new Date();
  currentDate:string;
  random:string;
  kanban=localStorage.getItem("lastTable");
  constructor(public db:AngularFireDatabase,
    public auth:AuthService) {}
  zero(date){
    if(date<10) return 0;
    return "";
  }
  logSave(userId:string,titleLog:string,type:string,description:string):void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.",titleLog);
    this.date=new Date;
    this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
    firebase.database().ref('users/'+ userId+'/logs/'+titleLog).set({
      data:this.currentDate,
      type:type,
      description:description,
    });
  }
  getKanbanTable(userId:string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/project/').valueChanges();
  }
  removeKanbanTableFromProject(userId:string,removeItem:string){
    return this.db.list('/users/'+userId+'/project/').remove(removeItem)
  }
  removeKanbanTable(userId:string,removeItem:string){
    return this.db.list('/users/'+userId).remove(removeItem)
  }

  writeUserData(userId: string,email: string,thema: string,google:boolean){
    firebase.database().ref('users/'+ userId+'/userInfo/info').set({
    email:email,
    thema:thema,
    google:google
    });
  }
  writeUserNumber(userId: string,number: number){
    firebase.database().ref('users/'+ userId+'/'+this.kanban+'/viewTables/numbers').set({
    number:number
    });
  }
  writeUserTable(userId: string,tableparent: string,tablechild: string,title: string,description: string,priority: string,color: string,endDate: string,user:string){
    firebase.database().ref('users/'+ userId+'/'+this.kanban+'/'+tableparent+'/'+tablechild).set({
    title:title,
    description:description,
    priority:priority,
    color:color,
    endDate:endDate,
    user:user
  });
  }

  updateChoiceUser(userId:string,user:string,tableparent:string,tablechild:string){
    return this.db.object('users/'+ userId+'/'+this.kanban+'/'+tableparent+'/'+tablechild).update({user:user})
  }

  writeTitleTable(userId: string,tablechild: string,title: string){
    firebase.database().ref('users/'+ userId+'/'+this.kanban+'/table/'+tablechild).set({
    title:title
  });
  }
  getDateUser(userId: string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/userInfo/').valueChanges();
  }
  getUserNumber(userId:string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/'+this.kanban+'/viewTables').valueChanges();
  }
  getTask(userId:string,tableparent:string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/'+this.kanban+'/'+tableparent).valueChanges();
  }
  
  getLogs(userId:string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/logs').valueChanges();
  }
  getCategory(userId:string):Observable<any[]>{
    return this.db.list('users/'+ userId+'/category/').valueChanges();
  }
  updateEmail(userId:string,newEmail:string){
    return this.db.object('/users/'+userId+'/userInfo/info').update({email:newEmail})
  }
  updateThema(userId:string,newThema:string){
    return this.db.object('/users/'+userId+'/userInfo/info').update({thema:newThema})
  } 
  removeTask(userId:string,tableparent:string,removeItem:string){
    return this.db.list('/users/'+userId+'/'+this.kanban+'/'+tableparent).remove(removeItem)
  }
  removeTable(userId:string,removeItem:string){
    return this.db.object('/users/'+userId+"/"+this.kanban+'/'+removeItem).remove()
  }
  writeCategory(userId:string,category:string,color:string){
    firebase.database().ref('users/'+ userId+'/category/'+category).set({
    category:category,
    color:color,
  });}
  removeCategory(userId:string,removeCategory:string){
    return this.db.list('users/'+ userId+'/category/').remove(removeCategory);
}
  deleteUser(userId:string){
    return this.db.list('users/').remove(userId);
  }


  writeKanbanTable(userId: string,projectName: string,share:boolean=false){
    firebase.database().ref('users/'+ userId+'/project/'+projectName).set({
      projectName:projectName,
      share:share
      });
  }
//dla tego co sie dzieli
  writeShareFriends(userId: string,friendsEmail:string,friendsId:string,role:string){
    firebase.database().ref('users/'+ userId+'/'+this.kanban+'/viewTables/share/'+friendsEmail).set({
    friendsEmail:friendsEmail,
    friendsId:friendsId,
    role:role
    });
  }
  removeShareFriends(userId:string,friendsEmail:string){
    return this.db.list('users/'+ userId+'/'+this.kanban+'/viewTables/share/').remove(friendsEmail)
  }

  getShareFriends(userId:string){
    return this.db.list('users/'+userId+'/'+this.kanban+'/viewTables/share/').valueChanges();
  }

  updateShare(userId:string,projectName:string,share:boolean){
    return this.db.object('users/'+userId+'/project/'+projectName).update({share:share})
  }
  //dla tego z kim chcemy sie dzielic
  share(friendsId:string,userId:string,kanban:string){
    firebase.database().ref('users/'+friendsId+'/shared/'+kanban).set({
      userId:userId,
      kanban:kanban
    })
  }
  removeShare(friendsId:string,kanban:string){
    return this.db.list('users/'+friendsId+'/shared/').remove(kanban)
  }
  getShare(userId:string){
    return this.db.list('users/'+userId+'/shared').valueChanges();
  }

  //chat!
  writeMessage(ownerId:string,email:string,projectName:string,data:string,message:string){
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","chat");
    firebase.database().ref('users/'+ownerId+'/chat/'+projectName+'/'+this.random).set({
      projectName:projectName,
      email:email,
      data:data,
      message:message
    })
  }
  getMessage(ownerId:string,projectName:string){ 
 return  this.db.list('users/'+ownerId+'/chat/'+projectName,ref=>ref.orderByChild('data')).valueChanges()
  }
  writeMessageToFriends(myId:string,friendsId:string,myEmail:string,friendsEmail:string,data:string,message:string,userName:string){
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","chatWitchFriend");
    firebase.database().ref('users/'+myId+'/chat/'+friendsEmail+'/'+this.random).set({
      data:data,
      message:message,
      email:userName,
    })
    firebase.database().ref('users/'+friendsId+'/chat/'+myEmail+'/'+this.random).set({
      data:data,
      message:message,
      email:userName,
    })
    this.deleteNewMesage(friendsId,myEmail);
    this.newMessage(friendsId,myEmail,userName);
  }
  getMessageWitchFriend(myId:string,friendsEmail:string){
    return this.db.list('users/'+myId+'/chat/'+friendsEmail,ref=>ref.orderByChild('data')).valueChanges()
  }
  //
  newMessage(friendsId:string,myEmail:string,userName:string){
    firebase.database().ref('users/'+friendsId+'/chatares/'+myEmail).set({
      email:userName
    })
  }
  deleteNewMesage(friendsId:string,myEmail:string){
    this.db.list('users/'+friendsId+'/chatares/').remove(myEmail);
  }
  getNewMassage(myId:string){
    return this.db.list('users/'+myId+'/chatares/').valueChanges();
  }
  //
  deleteAllMessage(myId:string,friendsId:string,myEmail:string,friendsEmail:string){
     this.db.list('users/'+myId+'/chat/').remove(friendsEmail)
     this.db.list('users/'+friendsId+'/chat/').remove(myEmail)
  }




  updateAccept(friendsId,email:string){
    return this.db.object('users/'+friendsId+'/myFriends/'+email).update({accept:true})
  }
  acceptInvities(userId:string,friendsEmail:string,friendsId:string,myEmail:string){
    this.writeMyFriends(userId,friendsEmail,friendsId,true);
    this.removeInvities(userId,friendsEmail);
    this.updateAccept(friendsId,myEmail)
  }
  dontAcceptInvities(userId:string,friendsEmail:string,friendsId:string,myEmail:string){
    this.removeInvities(userId,friendsEmail);
    this.deleteFriends(friendsId,myEmail);
  }
  sendInvities(userId:string,friendsEmail:string,friendsId:string,accept:boolean){
    firebase.database().ref('users/'+userId+'/invities/'+friendsEmail).set({
      friendsEmail:friendsEmail,
      friendsId:friendsId,
      accept:accept
    })
  }
  getInvities(userId:string){
    return this.db.list('users/'+userId+'/invities/').valueChanges();
  }
  removeInvities(userId:string,email:string){
    return this.db.list('users/'+userId+'/invities/').remove(email)
  }
  deleteFriends(userId:string,email:string){
    return this.db.list('users/'+userId+'/myFriends/').remove(email)
  }
  getAllUser(){
    return this.db.list('users/friends/').valueChanges();
  }
  getAllMyFriends(userId:string){
    return this.db.list('users/'+userId+'/myFriends/',ref=>ref.orderByChild('friendsEmail')).valueChanges();
  }
  writeUser(userId:string,email:string,online:boolean){
    firebase.database().ref('users/friends/'+email).set({
      email:email,
      userId:userId,
      online:online
    })
  }
  writeMyFriends(userId:string,friendsEmail:string,friendsId:string,accept:boolean){
    firebase.database().ref('users/'+userId+'/myFriends/'+friendsEmail).set({
      friendsEmail:friendsEmail,
      friendsId:friendsId,
      accept:accept
    })
  }
  remove(email){
    return this.db.list('users/friends').remove(email);
  }
  updateOnline(email:string,online:boolean){
    return this.db.object('users/friends/'+email).update({online:online})
  }


}