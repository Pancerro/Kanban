import { ShareFriend } from 'src/app/class/shareFriend/share-friend';
import { StopShareUser } from 'src/app/class/stopShareUser/stop-share-user';
import { ShareFor } from 'src/app/class/shareFor/share-for';
import { Observable } from 'rxjs';
import { Project } from 'src/app/class/project/project';

export interface ShareTable {
      writeShareFriends(kanban:string,shareFriend: ShareFriend): void;
      removeShareFriends(kanban:string,userId: string, friendsEmail: string):Promise<void>;
      getShareFriends(kanban:string,userId: string):Observable<any[]> ;
      writeDelete(kanban:string,stopShareUser: StopShareUser):void;
      removeDelete(kanban:string,userId: string, friendsEmail: string):Promise<void>;
      getDelete(kanban:string,userId: string): Observable<any[]>
      updateShare(procjet:Project):Promise<void>;
      share(shareFor: ShareFor): void;
      removeShare(friendsId: string, kanban: string):Promise<void>;
      getShare(userId: string): Observable<any[]>;

}
