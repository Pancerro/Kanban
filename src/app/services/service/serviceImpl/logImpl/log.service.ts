import { Injectable } from '@angular/core';
import { Log } from '../../service/log/log';
import { Log as Logi } from 'src/app/class/log/log';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService implements Log {

  constructor(private db: AngularFireDatabase) { }
  private random: string;
  private word: string;
  public logSave(log: Logi): void {
    this.random = Math.random().toString();
    this.random = this.random.replace('0.', log.titleLog);
    firebase.database().ref('users/' + log.userId + '/logs/' + this.replece(log.titleLog)).set({
      data: log.date,
      type: log.type,
      description: log.description,
    });
  }
  public getLogs(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/logs').valueChanges();
  }

  public sortLogByType(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/logs', ref => ref.orderByChild('type')).valueChanges()
  }
  public sortLogByDescription(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/logs', ref => ref.orderByChild('description')).valueChanges()
  }
  public sortLogByDate(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/logs', ref => ref.orderByChild('data')).valueChanges()
  }
  private replece(replace: string): string {
    this.word = "";
    for (let letter of replace) {
      letter = letter.replace(".", "@1@");
      letter = letter.replace("#", "@2@");
      letter = letter.replace("$", "@3@");
      letter = letter.replace("[", "@4@");
      letter = letter.replace("]", "@5@");
      this.word = this.word + letter;
    }
    return this.word;
  }
}