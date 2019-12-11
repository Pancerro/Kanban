import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTaskComponent } from 'src/app/modal/edit-task/edit-task.component';
import { EditTableNameComponent } from 'src/app/modal/edit-table-name/edit-table-name.component';
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  table0:string="table0";
  table1:string="table1";
  table2:string="table2";
  table3:string="table3";
  table4:string="table4";
  table5:string="table5";
  table6:string="table6";
  table7:string="table7";
  table8:string="table8";
  table9:string="table9";
  titleTable:string;
  verifyEmail=this.auth.getUser().emailVerified;
  userId:string;
  title:string;
  description:string;
  priority:string;
  color:string;
  user:Observable<any[]>;
  tableZero=[];
  tableOne=[];
  tableTwo=[];
  tableThree=[];
  tableFour=[];
  tableFive=[];
  tableSix=[];
  tableSeven=[];
  tableEight=[];
  tableNine=[];
  tableTitle=[];
  numbers=[];
  ngOnInit(){
    this.db.getTask(this.userId,this.table0).subscribe(res => {
      this.tableZero = res;
    });
    this.db.getTask(this.userId,this.table1).subscribe(res => {
      this.tableOne = res;
    });
    this.db.getTask(this.userId,this.table2).subscribe(res => {
      this.tableTwo = res;
    });
    this.db.getTask(this.userId,this.table3).subscribe(res => {
      this.tableThree = res;
    });
    this.db.getTask(this.userId,this.table4).subscribe(res => {
      this.tableFour = res;
    });
    this.db.getTask(this.userId,this.table5).subscribe(res => {
      this.tableFive = res;
    });
    this.db.getTask(this.userId,this.table6).subscribe(res => {
      this.tableSix = res;
    });
    this.db.getTask(this.userId,this.table7).subscribe(res => {
      this.tableSeven = res;
    });
    this.db.getTask(this.userId,this.table8).subscribe(res => {
      this.tableEight = res;
    });
    this.db.getTask(this.userId,this.table9).subscribe(res => {
      this.tableNine = res;
    });
    this.db.getTask(this.userId,"table").subscribe(res => {
      this.tableTitle = res;
    });
    this.db.getUserNumber(this.userId).subscribe(res => {
      this.numbers = res;
    });

  }
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router,
    public dialog: MatDialog,
    ) {
      this.userId=auth.getUser().uid;
      this.user=db.getDateUser(this.userId);
    }
    addNewTable():void{
      this.numbers[0].number++;
      this.db.writeUserNumber(this.userId,this.numbers[0].number)
    }
    deleteLastTable():void{
      this.numbers[0].number--;
      this.db.writeUserNumber(this.userId,this.numbers[0].number)
    }
    logout():void{
      this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
    }
    saveChanges():void{
      this.db.removeTable(this.auth.getUser().uid,this.table0);
      this.db.removeTable(this.auth.getUser().uid,this.table1);
      this.db.removeTable(this.auth.getUser().uid,this.table2);
      this.db.removeTable(this.auth.getUser().uid,this.table3);
      this.db.removeTable(this.auth.getUser().uid,this.table4);
      this.db.removeTable(this.auth.getUser().uid,this.table5);
      this.db.removeTable(this.auth.getUser().uid,this.table6);
      this.db.removeTable(this.auth.getUser().uid,this.table7);
      this.db.removeTable(this.auth.getUser().uid,this.table8);
      this.db.removeTable(this.auth.getUser().uid,this.table9);
      for(let d of this.tableZero){
        this.db.writeUserTable(this.userId,this.table0,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableOne){
        this.db.writeUserTable(this.userId,this.table1,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableTwo){
        this.db.writeUserTable(this.userId,this.table2,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableThree){
        this.db.writeUserTable(this.userId,this.table3,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableFour){
        this.db.writeUserTable(this.userId,this.table4,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableFive){
        this.db.writeUserTable(this.userId,this.table5,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableSix){
        this.db.writeUserTable(this.userId,this.table6,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableSeven){
        this.db.writeUserTable(this.userId,this.table7,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableEight){
        this.db.writeUserTable(this.userId,this.table8,d.title,d.title,d.description,d.priority,d.color);
      }
      for(let d of this.tableNine){
        this.db.writeUserTable(this.userId,this.table9,d.title,d.title,d.description,d.priority,d.color);
      }
      
    }
    addTask(tableName): void {
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
        this.db.writeUserTable(this.userId,tableName,this.title,this.title,this.description,this.priority,this.color);
       }});
    }
    editTask(title,description,priority,color,tableName): void {
      const dialogRef = this.dialog.open(EditTaskComponent, {
        width: '250px',
        data: {title: title, description: description, priority:priority,color:color}
          });
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
          if(result)
          {
        this.db.removeTask(this.userId,tableName,title);
        this.title=result.value.task.title;
        this.description=result.value.task.description;
        this.priority=result.value.task.priority;
        this.color=result.value.task.color;
        this.db.writeUserTable(this.userId,tableName,this.title,this.title,this.description,this.priority,this.color);
       }}});
    }
    removeTask(removeTask,tableName):void{
      this.db.removeTask(this.userId,tableName,removeTask);
    }
    removeAllTask(tableName):void{
      this.db.removeTable(this.userId,tableName);
    }
    updateTableTitle(title):void {
      const dialogRef = this.dialog.open(EditTableNameComponent, {
        width: '250px',
          });
      dialogRef.afterClosed().subscribe(result => {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
          if(result)
          {   
            this.titleTable=result.value.titleTable.title;
            this.db.writeTitleTable(this.userId,title,this.titleTable);
       }}});
    }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.saveChanges();
    }
  }
  bestRegards(){
    window.alert("BEST REGARDS, SUKO!");
   this.logout();
  }
}
