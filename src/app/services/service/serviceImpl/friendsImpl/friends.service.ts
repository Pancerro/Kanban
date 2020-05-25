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
    firebase.database().ref('users/' + myFriend.getUserId() + '/myFriends/' + myFriend.getFriendsEmail()).set({
      friendsEmail: myFriend.getFriendsEmail(),
      friendsId: myFriend.getFriendsId(),
      accept: myFriend.getAccept()
    })
  }
  public writeMessageToFriends(chatWithFriend: ChatWithFriend): void {
    this.random = Math.random().toString();
    this.random = this.random.replace("0.", "chatWitchFriend");
    chatWithFriend.setData(firebase.database.ServerValue.TIMESTAMP.toString());
    firebase.database().ref('users/' + chatWithFriend.getMyId() + '/chat/' + chatWithFriend.getFriendsEmail() + '/' + this.random).set({
      data: chatWithFriend.getData(),
      message: chatWithFriend.getMessage(),
      email: chatWithFriend.getUserName(),
    })
    firebase.database().ref('users/' + chatWithFriend.getFriendsEmail() + '/chat/' + chatWithFriend.getMyEmail() + '/' + this.random).set({
      data: chatWithFriend.getData(),
      message: chatWithFriend.getMessage(),
      email: chatWithFriend.getUserName(),
    })
    this.deleteNewMesage(chatWithFriend.getFriendsId(), chatWithFriend.getMyEmail());
    this.newMessage(new NewMessage(chatWithFriend.getFriendsId(), chatWithFriend.getMyEmail(), chatWithFriend.getUserName()));
  }
  public getMessageWitchFriend(myId: string, friendsEmail: string):Observable<any[]> {
    return this.db.list('users/' + myId + '/chat/' + friendsEmail, ref => ref.orderByChild('data')).valueChanges()
  }
  public newMessage(newMessage: NewMessage): void {
    firebase.database().ref('users/' + newMessage.getFriendsId() + '/chatares/' + newMessage.getMyEmail()).set({
      email: newMessage.getUserName()
    })
  }
  public deleteNewMesage(friendsId: string, myEmail: string):void {
    this.db.list('users/' + friendsId + '/chatares/').remove(myEmail);
  }
  public getNewMassage(myId: string):Observable<any[]> {
    return this.db.list('users/' + myId + '/chatares/').valueChanges();
  }
  public deleteAllMessage(invities:Invities, myEmail: string):void {
    this.db.list('users/' + invities.getUserId() + '/chat/').remove(invities.getFriendsEmail())
    this.db.list('users/' + invities.getFriendsId() + '/chat/').remove(myEmail)
  }
  public updateAccept(friendsId, email: string):Promise<void> {
    return this.db.object('users/' + friendsId + '/myFriends/' + email).update({ accept: true })
  }
  public sendInvities(invities: Invities): void {
    firebase.database().ref('users/' + invities.getUserId() + '/invities/' + invities.getFriendsEmail()).set({
      friendsEmail: invities.getFriendsEmail(),
      friendsId: invities.getFriendsId(),
      accept: invities.getAccept()
    })
  }
  public getInvities(userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/invities/').valueChanges();
  }
  public acceptInvities(invities:Invities, myEmail: string):void {
    this.writeMyFriends(new MyFriend(invities.getUserId(), invities.getFriendsEmail(), invities.getFriendsId(), invities.getAccept()));
    this.removeInvities(new AllUser(invities.getUserId(), invities.getFriendsEmail(),null));
    this.updateAccept(invities.getFriendsId(), myEmail);
  }
  public dontAcceptInvities(invities:Invities, myEmail: string):void {
    this.removeInvities(new AllUser(invities.getUserId(), invities.getFriendsEmail(),null));
    this.deleteFriends(new AllUser(invities.getFriendsId(), myEmail,null));
  }
  public removeInvities(user:AllUser):Promise<void> {
    return this.db.list('users/' + user.getUserId() + '/invities/').remove(user.getEmail())
  }
  public deleteFriends(user:AllUser):Promise<void> {
    return this.db.list('users/' + user.getUserId() + '/myFriends/').remove(user.getEmail())
  }
  public getAllMyFriends(userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/myFriends/', ref => ref.orderByChild('friendsEmail')).valueChanges();
  }
}
