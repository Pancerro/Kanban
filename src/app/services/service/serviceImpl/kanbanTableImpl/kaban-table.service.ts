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
    firebase.database().ref('users/' + task.getUserId() + '/' + kanban + '/' + task.getTableParent() + '/' + task.getTableChild()).set({
      title: task.getTitle(),
      description: task.getDescription(),
      priority: task.getPriority(),
      color: task.getColor(),
      endDate: task.getEndDate(),
      user: task.getUser()
    });
  }
  public writeTitleTable(kanban:string,tableTitle: TableTitle): void {
    firebase.database().ref('users/' + tableTitle.getUserId() + '/' + kanban + '/table/' + tableTitle.getTableChild()).set({
      title: tableTitle.getTitle()
    });
  }
  public writeUserNumber(kanban:string,numberSeeTable: NumberSeeTable) {
    firebase.database().ref('users/' + numberSeeTable.getUserId() + '/' + kanban + '/viewTables/numbers/number').set({
      number: numberSeeTable.getNumber()
    });
  }
  public writeKanbanTable(kanban:string,project: Project): void {
    firebase.database().ref('users/' + project.getUserId() + '/project/' + project.getProjectName()).set({
      projectName: project.getProjectName(),
      share: project.getShare()
    });
  }
  getTask(kanban:string,task:Task): Observable<any[]> {
    return this.db.list('/users/' + task.getUserId() + '/' + kanban + '/' + task.getTableParent()).valueChanges();
  }
  removeTask(kanban:string,task:Task){
    return this.db.list('/users/' + task.getUserId() + '/' + kanban + '/' + task.getTableParent()).remove(task.getTableChild())
  }
  getKanbanTable(userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/project/').valueChanges();
  }
  getUserNumber(kanban:string,userId: string): Observable<any[]> {
    return this.db.list('/users/' + userId + '/' + kanban + '/viewTables/numbers').valueChanges();
  }
  removeKanbanTableFromProject(project:Project): Promise<void> {
    return this.db.list('/users/' + project.getUserId() + '/project/').remove(project.getProjectName())
  }
  removeKanbanTable(project:Project): Promise<void> {
    return this.db.list('/users/' + project.getUserId()).remove(project.getProjectName())
  }
   removeAllTaskFromOneTable(kanban:string,tableTitle:TableTitle): Promise<void> {
   return this.db.object('/users/' + tableTitle.getUserId() + "/" + kanban + '/' + tableTitle.getTitle()).remove()
  }
  updateChoiceUser(kanban:string,task:Task):Promise<void> {
    return this.db.object('users/' + task.getUserId() + '/' +kanban + '/' + task.getTableParent() + '/' + task.getTableChild()).update({ user: task.getUser() })
  }

}
