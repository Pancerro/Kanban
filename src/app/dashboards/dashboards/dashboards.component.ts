import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTaskComponent } from 'src/app/modal/edit-task/edit-task.component';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  verifyEmail=this.auth.getUser().emailVerified;
  userId:string;
  title:string;
  description:string;
  priority:string;
  color:string;
  user:Observable<any[]>;
  to:Observable<any[]>
  do:Observable<any[]>;
  done:Observable<any[]>;
  toTable=[];
  doTable=[];
  doneTable=[];
  ngOnInit(){
    this.db.getTask(this.userId,"to").subscribe(res => {
      this.toTable = res;
    });
    this.db.getTask(this.userId,"do").subscribe(res => {
      this.doTable = res;
    });
    this.db.getTask(this.userId,"done").subscribe(res => {
      this.doneTable = res;
    });
  }
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router,
    public dialog: MatDialog,
    ) {
      this.userId=auth.getUser().uid;
      this.user=db.getDateUser(auth.getUser().uid);
      this.to=this.db.getTask(this.userId,"to");
      this.do=this.db.getTask(this.userId,"do");
      this.done=this.db.getTask(this.userId,"done");
    }
    logout():void{
      this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
    }
    saveChanges():void{
      this.db.removeTable(this.auth.getUser().uid,"to");
      this.db.removeTable(this.auth.getUser().uid,"do");
      this.db.removeTable(this.auth.getUser().uid,"done");
      for(let d of this.toTable){
        this.db.writeUserTable(this.userId,"to",d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.doTable){
        this.db.writeUserTable(this.userId,"do",d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.doneTable){
        this.db.writeUserTable(this.userId,"done",d.title,d.title,d.description,d.priority,d.color);
      }
    }
    cancelChanges():void{
      window.location.reload();
    }
    addTo(): void {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '250px',
          });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,"to",this.title,this.title,this.description,this.priority,this.color);
       }});
    }
    addDo(): void {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '250px',
          });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,"do",this.title,this.title,this.description,this.priority,this.color);
      }});
    }
    addDone(): void {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '250px',
          });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,"done",this.title,this.title,this.description,this.priority,this.color);
      }});
    }
    editToTask(title,description,priority,color): void {
      const dialogRef = this.dialog.open(EditTaskComponent, {
        width: '250px',
        data: {title: title, description: description, priority:priority,color:color}
          });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
        this.db.removeTask(this.userId,"to",title);
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,"to",this.title,this.title,this.description,this.priority,this.color);
       }});
    }
    editDoTask(title,description,priority,color): void {
      const dialogRef = this.dialog.open(EditTaskComponent, {
        width: '250px',
        data: {title: title, description: description, priority:priority,color:color}
          });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
        this.db.removeTask(this.userId,"to",title);
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,"to",this.title,this.title,this.description,this.priority,this.color);
       }});
    }
    editDoneTask(title,description,priority,color): void {
      const dialogRef = this.dialog.open(EditTaskComponent, {
        width: '250px',
        data: {title: title, description: description, priority:priority,color:color}
          });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
        this.db.removeTask(this.userId,"to",title);
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,"to",this.title,this.title,this.description,this.priority,this.color);
       }});
    }
    removeToTask(removeTask){
      this.saveChanges();
      this.db.removeTask(this.userId,"to",removeTask);
    }
    removeDoTask(removeTask){
      this.saveChanges();
      this.db.removeTask(this.userId,"do",removeTask);
    }
    removeDoneTask(removeTask){
      this.saveChanges();
      this.db.removeTask(this.userId,"done",removeTask);
    }
    removeAllToTask(){
      this.saveChanges();
      this.db.removeTable(this.userId,"to");
    }
    removeAllDoTask(){
      this.saveChanges();
      this.db.removeTable(this.userId,"do");
    }
    removeAllDoneTask(){
      this.saveChanges();
      this.db.removeTable(this.userId,"done");
    }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
