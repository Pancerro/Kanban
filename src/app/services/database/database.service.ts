import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log as Logi } from 'src/app/class/log/log';
import { UserDate } from 'src/app/class/userDate/user-date';
import { NumberSeeTable } from 'src/app/class/numberSeeTable/number-see-table';
import { Task } from 'src/app/class/task/task';
import { TableTitle } from 'src/app/class/tableTitle/table-title';
import { Category } from 'src/app/class/category/category';
import { Project } from 'src/app/class/project/project';
import { ShareFriend } from 'src/app/class/shareFriend/share-friend';
import { StopShareUser } from 'src/app/class/stopShareUser/stop-share-user';
import { ShareFor } from 'src/app/class/shareFor/share-for';
import { AllChat } from 'src/app/class/allChat/all-chat';
import { ChatWithFriend } from 'src/app/class/chatWithFriend/chat-with-friend';
import { NewMessage } from 'src/app/class/newMessage/new-message';
import { Invities } from 'src/app/class/invities/invities';
import { AllUser } from 'src/app/class/allUser/all-user';
import { MyFriend } from 'src/app/class/myFriend/my-friend';
import { LogService } from '../service/serviceImpl/logImpl/log.service';
import { UserDateService } from '../service/serviceImpl/userDateImpl/user-date.service';
import { KabanTableService } from '../service/serviceImpl/kanbanTableImpl/kaban-table.service';
import { CategoryService } from '../service/serviceImpl/categoryImpl/category.service';
import { ShareTableService } from '../service/serviceImpl/shareTableImpl/share-table.service';
import { AllChatService } from '../service/serviceImpl/allChatImpl/all-chat.service';
import { FriendsService } from '../service/serviceImpl/friendsImpl/friends.service';
import { AllUserService } from '../service/serviceImpl/allUserImpl/all-user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private word: string;
  public kanban = localStorage.getItem("lastTable");
  constructor(
    private logService: LogService,
    private userDateService: UserDateService,
    private kanbanTableService: KabanTableService,
    private categoryService: CategoryService,
    private shareTableSerivce: ShareTableService,
    private allChatService: AllChatService,
    private friendsService:FriendsService,
    private allUserService:AllUserService

  ) { }
  //logi - start
  //class log -- zrobione --
  public logSave(log: Logi): void {
    this.logService.logSave(log);
  }
  public getLogs(userId: string): Observable<any[]> {
    return this.logService.getLogs(userId);
  }
  public sortLogByType(userId:string): Observable<any[]>{
    return this.logService.sortLogByType(userId);
  }
  public sortLogByDescription(userId:string): Observable<any[]>{
    return this.logService.sortLogByDescription(userId);
  }
  public sortLogByDate(userId:string): Observable<any[]>{
    return this.logService.sortLogByDate(userId);
  }
  //logi - koniec
  //userDate - start
  //class userData -- zrobione --
  public writeUserData(userData: UserDate): void {
    this.userDateService.writeUserData(userData);
  }
  public getDateUser(userId: string): Observable<any[]> {
    return this.userDateService.getDateUser(userId);
  }
  public updateEmail(userData: UserDate) {
    return this.userDateService.updateEmail(userData);
  }
  public updateThema(userData: UserDate) {
    return this.userDateService.updateThema(userData);
  }
  public deleteUser(userId: string) {
    return this.userDateService.deleteUser(userId);
  }
  // userDate - koniec
  //tablice Kanban - start
  //class task -- zrobione --
  public writeUserTable(task: Task): void {
    this.kanbanTableService.writeUserTable(this.kanban, task);
  }
  //class tableTitle -- zrobione --
  public writeTitleTable(tableTitle: TableTitle): void {
    this.kanbanTableService.writeTitleTable(this.kanban, tableTitle);
  }
  //class numberSeeTabe -- zrobione --
  public writeUserNumber(numberSeeTable: NumberSeeTable) {
    this.kanbanTableService.writeUserNumber(this.kanban, numberSeeTable);
  }
  //class project -- zrobione --
  public writeKanbanTable(project: Project): void {
    this.kanbanTableService.writeKanbanTable(this.kanban, project);
  }
  public getTask(task: Task): Observable<any[]> {
    return this.kanbanTableService.getTask(this.kanban, task);
  }
  public removeTask(task: Task): Promise<void> {
    return this.kanbanTableService.removeTask(this.kanban, task);
  }
  public getKanbanTable(userId: string): Observable<any[]> {
    return this.kanbanTableService.getKanbanTable(userId);
  }
  public getUserNumber(userId: string): Observable<any[]> {
    return this.kanbanTableService.getUserNumber(this.kanban, userId);
  }
  public removeKanbanTableFromProject(project: Project): Promise<void> {
    return this.kanbanTableService.removeKanbanTableFromProject(project);
  }
  public removeKanbanTable(project: Project): Promise<void> {
    return this.kanbanTableService.removeKanbanTable(project);
  }
  public removeTable(tableTitle: TableTitle): Promise<void> {
    return this.kanbanTableService.removeAllTaskFromOneTable(this.kanban, tableTitle);
  }
  public updateChoiceUser(task: Task): Promise<void> {
    return this.kanbanTableService.updateChoiceUser(this.kanban, task);
  }
  //tablica kanban -- koniec
  //category - start
  //class category -- zrobione --
  public writeCategory(category: Category): void {
    this.categoryService.writeCategory(category);
  }
  public getCategory(userId: string): Observable<any[]> {
    return this.categoryService.getCategory(userId);
  }
  public removeCategory(removeCategory: Category): Promise<void> {
    return this.categoryService.removeCategory(removeCategory);
  }
  //category - koniec
  // share table - start
  //dla tego co sie dzieli
  // class shareFriends -- zrobione --
  public writeShareFriends(shareFriend: ShareFriend): void {
    this.shareTableSerivce.writeShareFriends(this.kanban, shareFriend);
  }
  public removeShareFriends(userId: string, friendsEmail: string): Promise<void> {
    return this.shareTableSerivce.removeShareFriends(this.kanban, userId, friendsEmail);
  }
  public getShareFriends(userId: string): Observable<any[]> {
    return this.shareTableSerivce.getShareFriends(this.kanban, userId);
  }
  //class delete user -- zrobione --
  public writeDelete(stopShareUser: StopShareUser): void {
    this.shareTableSerivce.writeDelete(this.kanban, stopShareUser);
  }
  public removeDelete(userId: string, friendsEmail: string): Promise<void> {
    return this.shareTableSerivce.removeDelete(this.kanban, userId, friendsEmail);
  }
  public getDelete(userId: string): Observable<any[]> {
    return this.shareTableSerivce.getDelete(this.kanban, userId);
  }

  public updateShare(project: Project): Promise<void> {
    return this.shareTableSerivce.updateShare(project);
  }
  //dla tego z kim chcemy sie dzielic
  //class shareFor -- zrobione --
  public share(shareFor: ShareFor): void {
    this.shareTableSerivce.share(shareFor);
  }
  public removeShare(friendsId: string, kanban: string): Promise<void> {
    return this.shareTableSerivce.removeShare(friendsId, kanban);
  }
  public getShare(userId: string): Observable<any[]> {
    return this.shareTableSerivce.getShare(userId);
  }
  // share table - koniec
  //  group chat - start
  //chat!
  //class chat -- zrobione --
  public writeMessage(chat: AllChat): void {
    this.allChatService.writeMessage(chat);
  }
  public getMessage(project:Project):Observable<any[]> {
    return this.allChatService.getMessage(project);
  }
  public deleteChatMesage(project:Project):Promise<void> {
    return this.allChatService.deleteChatMesage(project)
  }
  // group chat - koniec

  // znajomi -- start
  //class myFriends -- zrobione --
  public writeMyFriends(myFriend: MyFriend): void {
   this.friendsService.writeMyFriends(myFriend);
  }
  //class chat with friends -- zrobione --
  public writeMessageToFriends(chatWithFriend: ChatWithFriend): void {
    this.friendsService.writeMessageToFriends(chatWithFriend);
  }
  public getMessageWitchFriend(myId: string, friendsEmail: string):Observable<any[]> {
    return this.friendsService.getMessageWitchFriend(myId,friendsEmail);
  }
  //class newMessage -- zrobione --
  public newMessage(newMessage: NewMessage): void {
  this.friendsService.newMessage(newMessage);
  }
  public deleteNewMesage(friendsId: string, myEmail: string): void {
   this.friendsService.deleteNewMesage(friendsId,myEmail);
  }
  public getNewMassage(myId: string):Observable<any[]> {
    return this.friendsService.getNewMassage(myId);
  }
  public deleteAllMessage(invities:Invities, myEmail: string):void {
    this.friendsService.deleteAllMessage(invities,myEmail);
  }
  public updateAccept(friendsId:string, email: string):Promise<void> {
    return this.friendsService.updateAccept(friendsId,email);
  }
  //class invities -- zrobione --
  public sendInvities(invities: Invities): void {
    this.friendsService.sendInvities(invities);
  }
  public getInvities(userId: string): Observable<any[]> {
    return this.friendsService.getInvities(userId);
  }
  public acceptInvities(invities:Invities, myEmail: string):void {
    this.friendsService.acceptInvities(invities,myEmail);
  }
  public dontAcceptInvities(invities:Invities, myEmail: string):void {
    this.friendsService.dontAcceptInvities(invities,myEmail);
  }
  public removeInvities(user:AllUser): Promise<void> {
    return this.friendsService.removeInvities(user);
  }
  public deleteFriends(user:AllUser): Promise<void> {
    return this.friendsService.deleteFriends(user);
  }
  public getAllMyFriends(userId: string): Observable<any[]> {
    return this.friendsService.getAllMyFriends(userId);
  }
  //znajomi - koniec

  //all user - start
  //class allUser -- zrobione --
  public writeUser(user: AllUser): void {
   this.allUserService.writeUser(user);
  }
  public getAllUser():Observable<any[]> {
    return this.allUserService.getAllUser();
  }
  public remove(email: string):Promise<void> {
    return this.allUserService.remove(email);
  }
  public updateOnline(user:AllUser):Promise<void> {
    return this.allUserService.updateOnline(user);
  }
  //all user - koniec
  replece(replace: string): string {
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
  public changeFont(thema:string):string
  {
    if(thema=="gray"){
      return "white";
    }
    if(thema=="black"){
      return "white";
    }
  }
  public changeBackground(thema:string):string{
    if(thema=="gray"){
      return "gray";
    }
    if(thema=="black"){
      return "black";
    }
  }
}
