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
  writeUserData(userId,email,thema){
    firebase.database().ref('users/'+ userId+'/userInfo/info').set({
    email:email,
    thema:thema
    }
    );
  }
  writeUserNumber(userId,number){
    firebase.database().ref('users/'+ userId+'/viewTables/numbers').set({
    number:number
    }
    );
  }
  writeUserTable(userId,tableparent,tablechild,title,description,priority,color,endDate){
    firebase.database().ref('users/'+ userId+'/'+tableparent+'/'+tablechild).set({
    title:title,
    description:description,
    priority:priority,
    color:color,
    endDate:endDate
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
  writeLogs(userId,tableName,data,operation,title,description,priority,color,endDate){
    firebase.database().ref('users/'+ userId+'/logs/'+tableName).set({
    data:data,
    operation:operation,
    title:title,
    description:description,
    priority:priority,
    color:color,
    endDate:endDate
  });}
  getLogs(userId):Observable<any[]>{
    return this.db.list('/users/'+userId+'/logs').valueChanges();
  }
  updateEmail(userId,newEmail){
    return this.db.object('/users/'+userId+'/userInfo/info').update({email:newEmail})
  }
  updateThema(userId,newThema){
    return this.db.object('/users/'+userId+'/userInfo/info').update({thema:newThema})
  } 
  writeCategory(userId,category,color){
    firebase.database().ref('users/'+ userId+'/category/'+category).set({
    category:category,
    color:color,
  });}
  getCategory(userId):Observable<any[]>{
    return this.db.list('users/'+ userId+'/category/').valueChanges();
  }
  removeCategory(userId,removeCategory){
    return this.db.list('users/'+ userId+'/category/').remove(removeCategory);
}
  deleteUser(userId){
    return this.db.list('users/').remove(userId);
  }
}