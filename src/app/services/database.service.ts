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
   getDateUser(userId):Observable<any[]>{
     return this.db.list('/users/'+userId+'/userInfo').valueChanges();
   }
   getUserNumber(userId):Observable<any[]>{
    return this.db.list('/users/'+userId+'/viewTables').valueChanges();
  }
   getTask(userId,tableparent):Observable<any[]>{
    return this.db.list('/users/'+userId+'/'+tableparent).valueChanges();
  }
   writeUserData(userId,email){
    firebase.database().ref('users/'+ userId+'/userInfo/info').set({
      email:email
    });}
    writeUserNumber(userId,number){
      firebase.database().ref('users/'+ userId+'/viewTables/numbers').set({
        number:number
      });}
    writeUserTable(userId,tableparent,tablechild,title,description,priority,color){
      firebase.database().ref('users/'+ userId+'/'+tableparent+'/'+tablechild).set({
        title:title,
        description:description,
        priority:priority,
        color:color
      });}
      removeTask(userId,tableparent,removeItem){
        return this.db.list('/users/'+userId+'/'+tableparent).remove(removeItem)
      }
      removeTable(userId,removeItem){
        return this.db.object('/users/'+userId+"/"+removeItem).remove()
      }
      writeTitleTable(userId,tablechild,title){
        firebase.database().ref('users/'+ userId+'/table/'+tablechild).set({
          title:title
        });}

      
}