import { Injectable } from '@angular/core';
import { ShareTable } from '../../service/shareTable/share-table';
import { ShareFriend } from 'src/app/class/shareFriend/share-friend';
import * as firebase from 'firebase';
import { StopShareUser } from 'src/app/class/stopShareUser/stop-share-user';
import { ShareFor } from 'src/app/class/shareFor/share-for';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Project } from 'src/app/class/project/project';

@Injectable({
  providedIn: 'root'
})
export class ShareTableService implements ShareTable {
  constructor(private db: AngularFireDatabase) { }
  public writeShareFriends(kanban: string, shareFriend: ShareFriend): void {
    firebase.database().ref('users/' + shareFriend.userId + '/' + kanban + '/viewTables/share/' + shareFriend.friendsEmail).set({
      friendsEmail: shareFriend.friendsEmail,
      friendsId: shareFriend.friendsId,
      role: shareFriend.role
    });
  }
  public removeShareFriends(kanban: string, userId: string, friendsEmail: string):Promise<void> {
    return this.db.list('users/' + userId + '/' + kanban + '/viewTables/share/').remove(friendsEmail)
  }
  public getShareFriends(kanban: string, userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/' + kanban + '/viewTables/share/').valueChanges();
  }
  public writeDelete(kanban: string, stopShareUser: StopShareUser):void {
    firebase.database().ref('users/' + stopShareUser.userId + '/' + kanban + '/viewTables/delete/' + stopShareUser.friendsEmail).set({
      friendsEmail: stopShareUser.friendsEmail,
      friendsId: stopShareUser.friendsId,
      role: stopShareUser.role
    });
  }
  public removeDelete(kanban: string, userId: string, friendsEmail: string):Promise<void> {
    return this.db.list('users/' + userId + '/' + kanban + '/viewTables/delete/').remove(friendsEmail)
  }

  public getDelete(kanban: string, userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/' + kanban + '/viewTables/delete/').valueChanges();
  }

  public updateShare(project:Project):Promise<void> {
    return this.db.object('users/' + project.userId + '/project/' + project.projectName).update({ share: project.share })
  }
  public share(shareFor: ShareFor): void {
    firebase.database().ref('users/' + shareFor.friendsId+ '/shared/' + shareFor.projectName).set({
      userId: shareFor.userId,
      kanban: shareFor.projectName
    })
  }
  public removeShare(friendsId: string, kanban: string):Promise<void> {
    return this.db.list('users/' + friendsId + '/shared/').remove(kanban)
  }
  public getShare(userId: string):Observable<any[]> {
    return this.db.list('users/' + userId + '/shared').valueChanges();
  }
}
