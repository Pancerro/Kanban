import { Injectable } from '@angular/core';
import {UserDate} from '../../service/userDate/user-date';
import {Observable} from 'rxjs';
import {UserDate as Ud} from 'src/app/class/userDate/user-date';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserDateService implements UserDate {

  constructor(private db: AngularFireDatabase) { }
  public writeUserData(userData: Ud): void {
    firebase.database().ref('users/' + userData.userId + '/userInfo/info').set({
      email: userData.email,
      thema: userData.thema,
      google: userData.google
    });
  }
  getDateUser(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/userInfo/').valueChanges();
  }
  updateEmail(userData: Ud):Promise<void> {
    return  this.db.object('/users/' + userData.userId + '/userInfo/info').update({ email: userData.email })
  }
  updateThema(userData: Ud):Promise<void> {
    return this.db.object('/users/' + userData.userId  + '/userInfo/info').update({ thema: userData.thema })
  }
  deleteUser(userId: string):Promise<void> {
    return this.db.list('users/').remove(userId);
  }
}
