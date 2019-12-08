import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(public db:AngularFireDatabase) {
   }
   getDateUser(userId){
     return this.db.list('/users/'+userId+'/userInfo').valueChanges()
   }
   writeUserData(userId,email){
    firebase.database().ref('users/'+ userId+'/userInfo/info').set({
      email:email
    });}
}