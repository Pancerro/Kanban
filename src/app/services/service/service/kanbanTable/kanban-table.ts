import {Task} from '../../../../class/task/task';
import {TableTitle} from '../../../../class/tableTitle/table-title';
import {NumberSeeTable} from '../../../../class/numberSeeTable/number-see-table';
import {Project} from '../../../../class/project/project';
import {Observable} from 'rxjs';

export interface KanbanTable {
  writeUserTable(kanban:string,task: Task): void;
  writeTitleTable(kanban:string,tableTitle: TableTitle): void;
  writeUserNumber(kanban:string,numberSeeTable: NumberSeeTable): void;
  writeKanbanTable(kanban:string,project: Project): void;
  getTask(kanban:string,task: Task): Observable<any[]>;
  removeTask(kanban:string,task: Task): Promise<void>;
  getKanbanTable(userId: string): Observable<any[]>;
  getUserNumber(kanban:string,userId: string): Observable<any[]>;
  removeKanbanTableFromProject(project:Project): Promise<void>;
  removeKanbanTable(project:Project): Promise<void>
  removeAllTaskFromOneTable(kanban:string,tableTitle:TableTitle): Promise<void>;
  updateChoiceUser(kanban:string,task: Task): Promise<void>;
}
