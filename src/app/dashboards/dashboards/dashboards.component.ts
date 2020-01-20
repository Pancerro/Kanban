import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { MatDialog} from '@angular/material';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTaskComponent } from 'src/app/modal/edit-task/edit-task.component';
import { EditTableNameComponent } from 'src/app/modal/edit-table-name/edit-table-name.component';
import { trigger, transition, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateX(-200%)',
        backgroundColor: 'green'}),
        animate(350)
      ]),
      transition(':leave', [
      style({
      backgroundColor: 'red',
      opacity: 1}),
      animate('0.5s ease-in')
      ])
      ]),
      trigger('itemTaskAnim', [
        transition(':enter', [
          style({
          opacity:1,
          backgroundColor: 'green'}),
          animate('0.1s ease-in')
        ]),
        transition(':leave', [
        style({
        backgroundColor: 'red',
        opacity: 1}),
        animate('0.1s ease-out')
        ])
        ])
    ]
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
  tableEditTitle:string;
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
  titleTable:string;
  word:string;
  verifyEmail=this.auth.getUser().emailVerified;
  date:Date= new Date();
  currentDate:string;
  random:string;
  userId:string;
  title:string;
  description:string;
  priority:string;
  color:string;
  endDate:Date;
  endData:string;
  endDataString:string;
  fontColor:string;
  background:string;
  tableTitle=[];
  numbers=[]
  tabEndDate=[];
  userInfo=[];
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
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
  }
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router,
    public dialog: MatDialog,
  ) {
      this.userId=auth.getUser().uid;
    }
  changeFont():string
  {
    if(this.userInfo[0].thema=="gray"){
    this.fontColor="white";
    return this.fontColor;
    }
    if(this.userInfo[0].thema=="black"){
    this.fontColor="white";
    return this.fontColor;
    }
  }
  changeBackground():string{
    if(this.userInfo[0].thema=="gray"){
      this.background="gray";
      return this.background;
      }
      if(this.userInfo[0].thema=="black"){
      this.background="black";
      return this.background;
      }
  }
  addNewTable():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logAddNewTable");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    switch(this.numbers[0].number){
      case 0:this.updateTableTitle(this.table0,true); break;
      case 1:this.updateTableTitle(this.table1,true); break;
      case 2:this.updateTableTitle(this.table2,true); break;
      case 3:this.updateTableTitle(this.table3,true); break;
      case 4:this.updateTableTitle(this.table4,true); break;
      case 5:this.updateTableTitle(this.table5,true); break;
      case 6:this.updateTableTitle(this.table6,true); break;
      case 7:this.updateTableTitle(this.table7,true); break;
      case 8:this.updateTableTitle(this.table8,true); break;
      case 9:this.updateTableTitle(this.table9,true); break;
    }
    this.db.writeLogs(this.userId,this.random,this.currentDate,"add new table",this.numbers[0].number);
  }
  deleteLastTable():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logDeleteLastTable");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.numbers[0].number--;
    switch(this.numbers[0].number){
      case 0: this.db.removeTable(this.userId,this.table0);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table0); this.db.writeTitleTable(this.userId,this.table0,"table1"); break;
      case 1: this.db.removeTable(this.userId,this.table1);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table1); this.db.writeTitleTable(this.userId,this.table1,"table2"); break;
      case 2: this.db.removeTable(this.userId,this.table2);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table2); this.db.writeTitleTable(this.userId,this.table2,"table3"); break;
      case 3: this.db.removeTable(this.userId,this.table3);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table3); this.db.writeTitleTable(this.userId,this.table3,"table4"); break;
      case 4: this.db.removeTable(this.userId,this.table4);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table4); this.db.writeTitleTable(this.userId,this.table4,"table5"); break;
      case 5: this.db.removeTable(this.userId,this.table5);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table5); this.db.writeTitleTable(this.userId,this.table5,"table6"); break;
      case 6: this.db.removeTable(this.userId,this.table6);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table6); this.db.writeTitleTable(this.userId,this.table6,"table7"); break;
      case 7: this.db.removeTable(this.userId,this.table7);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table7); this.db.writeTitleTable(this.userId,this.table7,"table8"); break;
      case 8: this.db.removeTable(this.userId,this.table8);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table8); this.db.writeTitleTable(this.userId,this.table8,"table9"); break;
      case 9: this.db.removeTable(this.userId,this.table9);
      this.db.writeLogs(this.userId,this.random,this.currentDate,"delete table",this.table9); this.db.writeTitleTable(this.userId,this.table9,"table10"); break;
    }
    this.db.writeUserNumber(this.userId,this.numbers[0].number)
  }
  addTask(tableName:string):void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logAddTaskFailed");
          this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"add task","add task failed");
        }
        else{
          this.title=result.value.task.title;
          this.description=result.value.task.description;
          this.priority=result.value.task.priority;
          this.color=result.value.task.color;
          this.endDate=result.value.task.endDate;
          if(this.endDate) this.endData=this.endDate.getDate()+'/'+(this.endDate.getMonth()+1)+'/'+this.endDate.getFullYear();
          else this.endData=null;
            this.db.writeUserTable(this.userId,tableName,this.replece(this.title),this.title,this.description,this.priority,this.color,this.endData);
            this.random=Math.random().toString();
            this.random=this.random.replace("0.","logAddTask");
            this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
            this.db.writeLogs(this.userId,this.random,this.currentDate,"add task","add task: "+this.title+" success");
        }
      }
    });
  }
  editTask(title:string,description:string,priority:string,color:string,endDate,tableName:string):void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
    width: '350px',
    data: {title: title, description: description, priority:priority,color:color,endDate:endDate}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      {
        if(result.invalid.title){
          window.alert("Please correct all errors and resubmit update task");
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logEditTaskFailed");
          this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"edit task","edit task: "+title+"failed");
        }
        else{  
          this.title=result.value.task.title;
          this.description=result.value.task.description;
          this.priority=result.value.task.priority;
          this.color=result.value.task.color;
          this.endDate=result.value.task.endDate;
            if(this.endDate==endDate){
              if(this.endData==undefined)
              {
                this.endData="";
              }
              else{
              this.endDataString=endDate;
              this.tabEndDate=this.endDataString.split("/");
              this.endData=this.tabEndDate[0]+'/'+this.tabEndDate[1]+'/'+this.tabEndDate[2];
              } 
            }
            else this.endData=this.endDate.getDate()+'/'+(this.endDate.getMonth()+1)+'/'+this.endDate.getFullYear();
            if(this.endData=="/undefined/undefined") this.endData="";
            this.db.removeTask(this.userId,tableName,this.replece(title));
            this.db.writeUserTable(this.userId,tableName,this.replece(this.title),this.title,this.description,this.priority,this.color,this.endData);
            this.random=Math.random().toString();
            this.random=this.random.replace("0.","logEditTask");
            this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
            this.db.writeLogs(this.userId,this.random,this.currentDate,"edit task","task "+title+" success");
        }
      }
    });
  }
  removeTask(removeTask: string,tableName:string):void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logRemoveTask");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"remove task","remove task: "+removeTask);
    this.db.removeTask(this.userId,tableName,this.replece(removeTask));
  }
  removeAllTask(tableName:string):void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logRemoveAllTask");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"remove all task","remove all task from table: "+tableName);
    this.db.removeTable(this.userId,tableName);
  }
  updateTableTitle(title:string,addTable:boolean):void {
    switch(title){
      case "table0": this.tableEditTitle=this.tableTitle[0].title; break;
      case "table1": this.tableEditTitle=this.tableTitle[1].title; break;
      case "table2": this.tableEditTitle=this.tableTitle[2].title; break;
      case "table3": this.tableEditTitle=this.tableTitle[3].title; break;
      case "table4": this.tableEditTitle=this.tableTitle[4].title; break;
      case "table5": this.tableEditTitle=this.tableTitle[5].title; break;
      case "table6": this.tableEditTitle=this.tableTitle[6].title; break;
      case "table7": this.tableEditTitle=this.tableTitle[7].title; break;
      case "table8": this.tableEditTitle=this.tableTitle[8].title; break;
      case "table9": this.tableEditTitle=this.tableTitle[9].title; break;
    }
    const dialogRef = this.dialog.open(EditTableNameComponent, {
    width: '250px', 
    data:{title:this.tableEditTitle, addTable:addTable}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        if(result.invalid){
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logUpdateTableTitleFailed");
          this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"update table title ","update table "+title+" failed");
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
          if(result){   
            if(addTable) {
              this.numbers[0].number++;
              this.db.writeUserNumber(this.userId,this.numbers[0].number);
            }
            this.titleTable=result.value.titleTable.title;
            this.random=Math.random().toString();
            this.random=this.random.replace("0.","logUpdateTableTitle");
            this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
            this.db.writeLogs(this.userId,this.random,this.currentDate,"update Table Title","update table "+title+" success");
            this.db.writeTitleTable(this.userId,title,this.titleTable);
          }
        }
        }
    });
  }
  replece(replace:string):string{
    this.word="";
    for(let letter of replace)
    {
      letter=letter.replace(".","1");
      letter=letter.replace("#","2");      
      letter=letter.replace("$","3");
      letter=letter.replace("[","4");
      letter=letter.replace("]","5");
      this.word=this.word+letter;
    }
    return this.word;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      this.saveChanges();
    }
  }

  logout():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logOut");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"log out","log out");
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }
  logs():void{
    this.router.navigate(['/logi']);
  }
  settings():void{
    this.router.navigate(['/settings']);
  }

  saveChanges():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logSaveChanges");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"save changes","save changes");
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
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table0,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableOne){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table1,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableTwo){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table2,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableThree){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table3,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableFour){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table4,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableFive){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table5,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableSix){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table6,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableSeven){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table7,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableEight){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table8,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
    for(let d of this.tableNine){
      if(d.endDate==null) d.endDate="";
      this.db.writeUserTable(this.userId,this.table9,this.replece(d.title),d.title,d.description,d.priority,d.color,d.endDate);
    }
  }
  checkPrio(priority: string):string{
    switch(priority){
      case "red":return "high"; break;
      case "yellow":return "medium";break;
      case "green":return "low"; break;
      default:return "";
    }
  }
}
