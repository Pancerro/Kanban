import { Injectable } from '@angular/core';
import { AllChat } from '../../service/allChat/all-chat';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Project } from 'src/app/class/project/project';
import { AllChat as ac } from 'src/app/class/allChat/all-chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllChatService implements AllChat {
  private random: string;
  constructor(private db: AngularFireDatabase) { }
  public writeMessage(chat: ac): void {
    this.random = Math.random().toString();
    this.random = this.random.replace("0.", "chat");
    chat.data=firebase.database.ServerValue.TIMESTAMP.toString();
    firebase.database().ref('users/' + chat.myId + '/chat/' + chat.projectName + '/' + this.random).set({
      projectName: chat.projectName,
      email: chat.email,
      data: chat.data,
      message: chat.message
    })
  }
  public getMessage(project: Project): Observable<any[]> {
    return this.db.list('users/' + project.userId + '/chat/' + project.projectName, ref => ref.orderByChild('data')).valueChanges();
  }
  public deleteChatMesage(project: Project): Promise<void> {
    return this.db.list('users/' + project.userId + '/chat/').remove(project.projectName);
  }
}
