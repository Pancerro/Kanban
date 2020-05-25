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
    chat.setData(firebase.database.ServerValue.TIMESTAMP.toString());
    firebase.database().ref('users/' + chat.getMyId() + '/chat/' + chat.getProjectName() + '/' + this.random).set({
      projectName: chat.getProjectName(),
      email: chat.getEmail(),
      data: chat.getData(),
      message: chat.getMessage()
    })
  }
  public getMessage(project: Project): Observable<any[]> {
    return this.db.list('users/' + project.getUserId() + '/chat/' + project.getProjectName(), ref => ref.orderByChild('data')).valueChanges();
  }
  public deleteChatMesage(project: Project): Promise<void> {
    return this.db.list('users/' + project.getUserId() + '/chat/').remove(project.getProjectName());
  }
}
