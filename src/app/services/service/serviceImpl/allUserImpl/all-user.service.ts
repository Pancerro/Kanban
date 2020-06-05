import { Injectable } from '@angular/core';
import { AllUser } from '../../service/allUser/all-user';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AllUser as au } from 'src/app/class/allUser/all-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllUserService implements AllUser {

  constructor(private db: AngularFireDatabase) { }

  public writeUser(user: au): void {
    firebase.database().ref('users/friends/' + user.email).set({
      email: user.email,
      userId: user.userId,
      online: user.online
    })
  }
  public getAllUser(): Observable<any[]> {
    return this.db.list('users/friends/').valueChanges();
  }

  public remove(email: string): Promise<void> {
    return this.db.list('users/friends').remove(email);
  }
  public updateOnline(user: au): Promise<void> {
    return this.db.object('users/friends/' + user.email).update({ online: user.online })
  }
}