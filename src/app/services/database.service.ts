import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(public db:AngularFireDatabase) {
   }
   getDateUser(userId){
     return this.db.list('/users/'+userId+'/userInfo').valueChanges()
   }
   getTask(userId,tableparent):Observable<any[]>{
    return this.db.list('/users/'+userId+'/'+tableparent).valueChanges()
  }
   writeUserData(userId,email){
    firebase.database().ref('users/'+ userId+'/userInfo/info').set({
      email:email
    });}
    writeUserTable(userId,tableparent,tablechild,title,description,priority){
      firebase.database().ref('users/'+ userId+'/'+tableparent+'/'+tablechild).set({
        title:title,
        description:description,
        priority:priority
      });}
      removeTask(userId,tableparent,removeItem){
        return this.db.list('/users/'+userId+'/'+tableparent).remove(removeItem)
      }
      removeTable(userId,removeItem){
        return this.db.object('/users/'+userId+"/"+removeItem).remove()
      }
}