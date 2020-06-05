import { Injectable } from '@angular/core';
import {KanbanTable} from '../../service/kanbanTable/kanban-table';
import { Task } from 'src/app/class/task/task';
import {Observable} from 'rxjs';
import {Project} from '../../../../class/project/project';
import {TableTitle} from '../../../../class/tableTitle/table-title';
import {NumberSeeTable} from '../../../../class/numberSeeTable/number-see-table';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class KabanTableService implements KanbanTable{
  constructor( private db: AngularFireDatabase) {
  
   }
  public writeUserTable(kanban:string,task: Task): void {
    firebase.database().ref('users/' + task.userId + '/' + kanban + '/' + task.tableParent + '/' + task.tableChild).set({
      title: task.title,
      description: task.description,
      priority: task.priority,
      color: task.color,
      endDate: task.endDate,
      user: task.user
    });
  }
  public writeTitleTable(kanban:string,tableTitle: TableTitle): void {
    firebase.database().ref('users/' + tableTitle.userId + '/' + kanban + '/table/' + tableTitle.tableChild).set({
      title: tableTitle.title
    });
  }
  public writeUserNumber(kanban:string,numberSeeTable: NumberSeeTable) {
    firebase.database().ref('users/' + numberSeeTable.userId + '/' + kanban + '/viewTables/numbers/number').set({
      number: numberSeeTable.number
    });
  }
  public writeKanbanTable(kanban:string,project: Project): void {
    firebase.database().ref('users/' + project.userId + '/project/' + project.projectName).set({
      projectName: project.projectName,
      share: project.share
    });
  }
  getTask(kanban:string,task:Task): Observable<any[]> {
    return this.db.list('/users/' + task.userId + '/' + kanban + '/' + task.tableParent).valueChanges();
  }
  removeTask(kanban:string,task:Task){
    return this.db.list('/users/' + task.userId + '/' + kanban + '/' + task.tableParent).remove(task.tableChild)
  }
  getKanbanTable(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/project/').valueChanges();
  }
  getUserNumber(kanban:string,userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/' + kanban + '/viewTables/numbers').valueChanges();
  }
  removeKanbanTableFromProject(project:Project): Promise<void> {
    return this.db.list('/users/' + project.userId + '/project/').remove(project.projectName)
  }
  removeKanbanTable(project:Project): Promise<void> {
    return this.db.list('/users/' + project.userId).remove(project.projectName)
  }
   removeAllTaskFromOneTable(kanban:string,tableTitle:TableTitle): Promise<void> {
   return this.db.object('/users/' + tableTitle.userId+ "/" + kanban + '/' + tableTitle.title).remove()
  }
  updateChoiceUser(kanban:string,task:Task):Promise<void> {
    return this.db.object('users/' + task.userId + '/' +kanban + '/' + task.tableParent + '/' + task.tableChild).update({ user: task.user })
  }

}
