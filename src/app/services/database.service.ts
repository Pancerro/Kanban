import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public db:AngularFireDatabase) {}
  writeUserData(userId,email,thema){
    firebase.database().ref('users/'+ userId+'/userInfo/info').set({
    email:email,
    thema:thema
    });
  }
  writeUserNumber(userId,number){
    firebase.database().ref('users/'+ userId+'/viewTables/numbers').set({
    number:number
    });
  }
  writeUserTable(userId,tableparent,tablechild,title,description,priority,color,endDate){
    firebase.database().ref('users/'+ userId+'/'+tableparent+'/'+tablechild).set({
    title:title,
    description:description,
    priority:priority,
    color:color,
    endDate:endDate
  });
  }
  writeTitleTable(userId,tablechild,title){
    firebase.database().ref('users/'+ userId+'/table/'+tablechild).set({
    title:title
  });
  }
  writeLogs(userId,tableName,data,operation,title,description,priority,color,endDate){
    firebase.database().ref('users/'+ userId+'/logs/'+tableName).set({
    data:data,
    operation:operation,
    title:title,
    description:description,
    priority:priority,
    color:color,
    endDate:endDate
  });
  }
  getDateUser(userId: string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/userInfo').valueChanges();
  }
  getUserNumber(userId:string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/viewTables').valueChanges();
  }
  getTask(userId:string,tableparent:string):Observable<any[]>{
    return this.db.list('/users/'+userId+'/'+tableparent).valueChanges();
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
    return this.db.list('/users/'+userId+'/'+tableparent).remove(removeItem)
  }
  removeTable(userId:string,removeItem:string){
    return this.db.object('/users/'+userId+"/"+removeItem).remove()
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
}