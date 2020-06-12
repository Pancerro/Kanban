import { Injectable } from '@angular/core';
import { Friends } from '../../service/friends/friends';
import { MyFriend } from 'src/app/class/myFriend/my-friend';
import * as firebase from 'firebase';
import { ChatWithFriend } from 'src/app/class/chatWithFriend/chat-with-friend';
import { NewMessage } from 'src/app/class/newMessage/new-message';
import { Invities } from 'src/app/class/invities/invities';
import { AngularFireDatabase } from 'angularfire2/database';
import { AllUser } from 'src/app/class/allUser/all-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService implements Friends {
  random: string;
  constructor(private db: AngularFireDatabase) { }
  public writeMyFriends(myFriend: MyFriend): void {
    firebase.database().ref('users/' + myFriend.userId + '/myFriends/' + myFriend.friendsEmail).set({
      friendsEmail: myFriend.friendsEmail,
      friendsId: myFriend.friendsId,
      accept: myFriend.accept
    })
  }
  public writeMessageToFriends(chatWithFriend: ChatWithFriend): void {
    this.random = Math.random().toString();
    this.random = this.random.replace("0.", "chatWitchFriend");
    chatWithFriend.data=firebase.database.ServerValue.TIMESTAMP;
    firebase.database().ref('users/' + chatWithFriend.myId + '/chat/' + chatWithFriend.friendsEmail + '/' + this.random).set({
      data: chatWithFriend.data,
      message: chatWithFriend.message,
      email: chatWithFriend.email,
    })
    firebase.database().ref('users/' + chatWithFriend.friendsId + '/chat/' + chatWithFriend.myEmail + '/' + this.random).set({
      data: chatWithFriend.data,
      message: chatWithFriend.message,
      email: chatWithFriend.email,
    })
    this.deleteNewMesage(chatWithFriend.friendsId, chatWithFriend.myEmail);
    this.newMessage(new NewMessage(chatWithFriend.friendsId, chatWithFriend.myEmail, chatWithFriend.email));
  }
  public getMessageWitchFriend(myId: string, friendsEmail: string):Observable<any[]> {
    return this.db.list('users/' + myId + '/chat/' + friendsEmail, ref => ref.orderByChild('data')).valueChanges()
  }
  public newMessage(newMessage: NewMessage): void {
    firebase.database().ref('users/' + newMessage.friendsId + '/chatares/' + newMessage.myEmail).set({
      email: newMessage.email
    })
  }
  public deleteNewMesage(friendsId: string, myEmail: string):void {
    this.db.list('users/' + friendsId + '/chatares/').remove(myEmail);
  }
  public getNewMassage(myId: string):Observable<any[]> {
    return this.db.list('users/' + myId + '/chatares/').valueChanges();
  }
  public deleteAllMessage(invities:Invities, myEmail: string):void {
    this.db.list('users/' + invities.userId + '/chat/').remove(invities.friendsEmail)
    this.db.list('users/' + invities.friendsId + '/chat/').remove(myEmail)
  }
  public updateAccept(friendsId:string, email: string):Promise<void> {
    return this.db.object('users/' + friendsId + '/myFriends/' + email).update({ accept: true })
  }
  public sendInvities(invities: Invities): void {
    firebase.database().ref('users/' + invities.userId + '/invities/' + invities.friendsEmail).set({
      friendsEmail: invities.friendsEmail,
      friendsId: invities.friendsId,
      accept: invities.accept
    })
  }
  public getInvities(userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/invities/').valueChanges();
  }
  public acceptInvities(invities:Invities, myEmail: string):void {
    this.writeMyFriends(new MyFriend(invities.userId, invities.friendsEmail, invities.friendsId, invities.accept));
    this.removeInvities(new AllUser(invities.userId, invities.friendsEmail,null));
    this.updateAccept(invities.friendsId, myEmail);
  }
  public dontAcceptInvities(invities:Invities, myEmail: string):void {
    this.removeInvities(new AllUser(invities.userId, invities.friendsEmail,null));
    this.deleteFriends(new AllUser(invities.friendsId, myEmail,null));
  }
  public removeInvities(user:AllUser):Promise<void> {
    return this.db.list('users/' + user.userId + '/invities/').remove(user.email)
  }
  public deleteFriends(user:AllUser):Promise<void> {
    return this.db.list('users/' + user.userId + '/myFriends/').remove(user.email)
  }
  public getAllMyFriends(userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/myFriends/', ref => ref.orderByChild('friendsEmail')).valueChanges();
  }
}
