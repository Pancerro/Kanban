import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';
import { MatDialog} from '@angular/material';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTaskComponent } from 'src/app/modal/edit-task/edit-task.component';
import { EditTableNameComponent } from 'src/app/modal/edit-table-name/edit-table-name.component';
import { trigger, transition, style, animate} from '@angular/animations';
import { CreateNewKanbanComponent } from 'src/app/modal/create-new-kanban/create-new-kanban.component';
import { ScrollToBottomDirective } from '../scroll-to-bottom.directive/scroll-to-bottom.directive.component';

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
  projectName:string;
  allUser=[];
  myFriend=[];
  myInvities=[];
  scroll: ScrollToBottomDirective;
  changeStatus(email){
    this.db.updateOnline(email,!this.checkStatus(email))
  }
  acceptInv(item){
    this.db.acceptInvities(this.userId,item.friendsEmail,item.friendsId,this.replece(this.userInfo[0].email))
  }
  dontAcceptInv(item){
    this.db.dontAcceptInvities(this.userId,item.friendsEmail,item.friendsId,this.replece(this.userInfo[0].email))
  }
  removeFriend(email){
    this.db.deleteFriends(this.userId,email);
  }
  addFriend(result){
    if(this.checkUser(this.replece(result))){
    if(!this.checkFriend(this.replece(result))){
     this.db.writeMyFriends(this.userId,this.replece(result),this.getFriendsId(this.replece(result)),false);
     this.db.sendInvities(this.getFriendsId(this.replece(result)),this.replece(this.userInfo[0].email),this.userId,false);
    } else window.alert("User is your friend")
    }
    else window.alert("Dont have user who use this email")
  }
  checkAccept(email){
    for(let item of this.myFriend){
      if(item.friendsEmail==email){
        if(item.accept) return true;
        else return false;
      }
  }
  return false;
  }
  checkUser(email){
    for(let item of this.allUser){
      if(item.email==email){
        return true;
      }
  }
  return false;
}

checkStatus(email){
  for(let item of this.allUser){
    if(item.email==email){
      if(item.online) return true;
      else return false;
    }
}
return false;
}
  getFriendsId(email){
    for(let item of this.allUser){
      if(item.email==email){
        return item.userId;
      }
  }
  return null;
  }
checkFriend(email){
  for(let item of this.myFriend){
    if(item.friendsEmail==email){
      return true;
    }
}
return false;
}
  checkIfProjectNameIsNotFree(projectName){
    for(let item of this.tableNameProject){
      if(item.projectName==projectName){
      return true
      }
    }
  }
  createNewKanbanTable(){
    const dialogRef = this.dialog.open(CreateNewKanbanComponent, {
      width: '250px',
      data: {edit:false}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result!=undefined){
          if(result.invalid){
            window.alert("Please correct all errors and resubmit add task");
            this.db.logSave(this.userId,"logAddNewKanbanProjectFailed","add new kanban project","add new kanban project failed")
          }
          else{
            this.db.kanban=result.value.kanban.name;
            if(this.checkIfProjectNameIsNotFree(this.db.kanban)){
              window.alert("Its name dont free! Use next name")
            }
            else{
            this.db.writeKanbanTable(this.userId,this.replece(this.db.kanban))
            this.db.writeTitleTable(this.userId,"table0","to do")
            this.db.writeTitleTable(this.userId,"table1","doing")
            this.db.writeTitleTable(this.userId,"table2","done")
            this.db.writeTitleTable(this.userId,"table3","table4");
            this.db.writeTitleTable(this.userId,"table4","table5");
            this.db.writeTitleTable(this.userId,"table5","table6");
            this.db.writeTitleTable(this.userId,"table6","table7");
            this.db.writeTitleTable(this.userId,"table7","table8");
            this.db.writeTitleTable(this.userId,"table8","table9");
            this.db.writeTitleTable(this.userId,"table9","table10");
            this.db.writeUserNumber(this.userId,3);
            this.db.logSave(this.userId,"logAddNewKanbanProject","add new kanban project","add new kanban project: "+this.title+" success")
            this.db.kanban=localStorage.getItem("lastTable")
          }
        }
        }
      });
  }
  seeMyProject(projectName:string){
    this.userId=this.auth.getUser().uid;
    this.db.kanban=projectName;
    localStorage.setItem("lastTable",projectName);
    this.ngOnInit();
  }
  removeProject(projectName:string){
    this.db.logSave(this.userId,"logRemoveProject","remove project","remove project: "+projectName)
    this.db.removeKanbanTable(this.userId,this.replece(projectName));
    this.db.removeKanbanTableFromProject(this.userId,this.replece(projectName));
    if(projectName==this.db.kanban) this.seeMyProject("kanban")
  }
  editProjectName(projectName:string){
    this.db.kanban=projectName;
    this.ngOnInit();
    const dialogRef = this.dialog.open(CreateNewKanbanComponent, {
      width: '250px',
      data: {projectName:projectName,edit:true}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result!=undefined){
          if(result.invalid){
            this.seeMyProject(localStorage.getItem("lastTable"));
            window.alert("Please correct all errors and resubmit add task");
            this.db.logSave(this.userId,"logEditNameKanbanProjectFailed","edit name kanban project","edit name kanban project failed")
          }
          else{
            this.db.kanban=result.value.kanban.name;
            if(this.checkIfProjectNameIsNotFree(this.db.kanban)){
              this.seeMyProject(localStorage.getItem("lastTable"));
              window.alert("Its name dont free! Use next name")
            }
            else{
              this.db.logSave(this.userId,"logEditKanbanProject","edit name kanban project","edit name kanban project: "+this.db.kanban+" success")
              this.db.removeKanbanTable(this.userId,this.replece(projectName));
              this.db.removeKanbanTableFromProject(this.userId,this.replece(projectName));
              this.db.writeKanbanTable(this.userId,this.replece(this.db.kanban))
              this.db.writeTitleTable(this.userId,"table0",this.tableTitle[0].title)
              this.db.writeTitleTable(this.userId,"table1",this.tableTitle[1].title)
              this.db.writeTitleTable(this.userId,"table2",this.tableTitle[2].title)
              this.db.writeTitleTable(this.userId,"table3",this.tableTitle[3].title);
              this.db.writeTitleTable(this.userId,"table4",this.tableTitle[4].title);
              this.db.writeTitleTable(this.userId,"table5",this.tableTitle[5].title);
              this.db.writeTitleTable(this.userId,"table6",this.tableTitle[6].title);
              this.db.writeTitleTable(this.userId,"table7",this.tableTitle[7].title);
              this.db.writeTitleTable(this.userId,"table8",this.tableTitle[8].title);
              this.db.writeTitleTable(this.userId,"table9",this.tableTitle[9].title);
              this.db.writeUserNumber(this.userId,this.numbers[0].number);
              this.saveChanges();
              this.ngOnInit();
              this.seeMyProject(localStorage.getItem("lastTable"));
            }
          }
        } else  this.seeMyProject(localStorage.getItem("lastTable"));
      });
      
  }
  checkIfTaskTitleIsNotFree(taskTitle,tableName){
    switch(tableName){
      case "table0":for(let item of this.tableZero){if(item.title==taskTitle) return true;} break;
      case "table1": for(let item of this.tableOne){if(item.title==taskTitle) return true;} break;
      case "table2": for(let item of this.tableTwo){if(item.title==taskTitle) return true;} break;
      case "table3": for(let item of this.tableThree){if(item.title==taskTitle) return true;} break;
      case "table4": for(let item of this.tableFour){if(item.title==taskTitle) return true;} break;
      case "table5": for(let item of this.tableFive){if(item.title==taskTitle) return true;} break;
      case "table6": for(let item of this.tableSix){if(item.title==taskTitle) return true;} break;
      case "table7": for(let item of this.tableSeven){if(item.title==taskTitle) return true;} break;
      case "table8":for(let item of this.tableEight){if(item.title==taskTitle) return true;} break;
      case "table9": for(let item of this.tableNine){if(item.title==taskTitle) return true;} break;
    }
  }
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
  tableNameProject=[];
  titleTable:string;
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
  word:string;
  tableTitle=[];
  numbers=[];
  tabEndDate=[];
  userInfo=[];



  deleteShareProject(projectName){
    this.stopShareProject(projectName)
     this.removeProject(projectName)
     window.location.reload();
  }

  editShareProject(projectName){// ni dziala

    this.stopShareProject(projectName);
    this.editProjectName(projectName);
    this.shareProject(projectName);

  }
  stopShareProject(projectName){
    this.db.getShareFriends(this.userId).subscribe(res=>{this.shareFriends=res});
    this.db.updateShare(this.userId,projectName,false);
    for(let item of this.shareFriends){
      this.db.removeShare(item.friendsId,projectName); 
      this.db.removeShareFriends(this.userId,item.friendsEmail)
    }  
    this.settingShare=false;
  }
  date:Date;
  currentDate:string
  getDate(){
    this.date=new Date;
    this.currentDate=(this.date.getDate()+'/'+this.db.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.db.zero(this.date.getHours())+this.date.getHours()+':'+this.db.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.db.zero(this.date.getSeconds())+this.date.getSeconds());
    return this.currentDate;
  }
  shareProject(projectName){
    this.db.kanban=projectName;
    this.db.updateShare(this.userId,projectName,true);
    this.db.writeShareFriends(this.userId,this.replece(this.userInfo[0].email),this.userId)
    this.db.share(this.userId,this.userId,projectName);
    localStorage.setItem("lastTable","kanban")
    this.db.kanban=localStorage.getItem("lastTable");
    this.ngOnInit()
    this.db.writeMessage(this.userId,projectName,projectName,this.getDate(),"Welcome to chat "+projectName)
  }
  
  shareTable(item,projectName){
    this.db.kanban=projectName
    this.db.writeShareFriends(this.userId,item.friendsEmail,item.friendsId);
    this.db.share(item.friendsId,this.userId,projectName)
    this.db.kanban=localStorage.getItem("lastTable")
  }
checkIfYou(email){ //nie dziala
  if(this.userInfo[0].email==email)
  return true
  else return false;
}
checkShare(email,projectName){
  this.db.kanban=projectName
  for(let item of this.shareFriends){
    if(item.friendsEmail==email){
      this.db.kanban=localStorage.getItem("lastTable")
      return true;
    }
}
this.db.kanban=localStorage.getItem("lastTable")
return false;
}

stopShare(friends,projectName){
  this.db.kanban=projectName;
  this.db.removeShareFriends(this.userId,friends.friendsEmail);
  this.db.removeShare(friends.friendsId,projectName)
  this.db.kanban=localStorage.getItem("lastTable")
}
settingShare=false;
viewMessage=[]
seeMyShareProject(item){
  this.settingShare=true;
  this.db.kanban=item.kanban;
  this.userId=item.userId;
  this.sharedInit();
  this.db.getShareFriends(this.userId).subscribe(res=>{this.shareFriends=res});
  this.db.getMessage(this.userId,item.kanban).subscribe(res=>this.viewMessage=res)
  window.scrollTo()
}
sendMessage(message){
  this.db.kanban=this.projectName;
  this.db.writeMessage(this.userId,this.userInfo[0].email,this.db.kanban,this.getDate(),message)
  this.db.getMessage(this.userId,this.projectName).subscribe(res=>this.viewMessage=res)
}
shareFriends=[]
shared=[]
sharedInit(){
  this.projectName=this.db.kanban;
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
  ngOnInit(){
    this.db.getShare(this.userId).subscribe(res=>{
      this.shared=res
  })
    if(localStorage.getItem("lastTable")==null) {
      localStorage.setItem("lastTable","kanban")
      this.db.kanban=localStorage.getItem("lastTable")
    }
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
    this.db.getKanbanTable(this.userId).subscribe(res => {
      this.tableNameProject = res;
    });
    this.db.getAllUser().subscribe(res=>{
      this.allUser=res
    })
    this.db.getAllMyFriends(this.userId).subscribe(res=>{
      this.myFriend=res;
    })
    this.db.getInvities(this.userId).subscribe(res=>{
      this.myInvities=res
    })
    this.projectName=this.db.kanban;
  }
  inreplece(replace:string):string{
    this.word="";
    for(let letter of replace)
    {
      letter=letter.replace("1",".");
      letter=letter.replace("2","#");      
      letter=letter.replace("3","$");
      letter=letter.replace("4","]");
      letter=letter.replace("5","[");
      this.word=this.word+letter;
    }
    return this.word;
  }
  constructor(
    private auth:AuthService,
    private db:DataService,
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
    switch(this.numbers[0].number){
      case 0:this.updateTableTitle(this.table0,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table0);break;
      case 1:this.updateTableTitle(this.table1,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table1);break;
      case 2:this.updateTableTitle(this.table2,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table2);break;
      case 3:this.updateTableTitle(this.table3,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table3);break;
      case 4:this.updateTableTitle(this.table4,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table4);break;
      case 5:this.updateTableTitle(this.table5,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table5);break;
      case 6:this.updateTableTitle(this.table6,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table6);break;
      case 7:this.updateTableTitle(this.table7,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table7);break;
      case 8:this.updateTableTitle(this.table8,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table8);break;
      case 9:this.updateTableTitle(this.table9,true);this.db.logSave(this.userId,"logAddNewTable","add new table",this.table9);break;
    }
  }
  deleteLastTable():void{
    this.numbers[0].number--;
    switch(this.numbers[0].number){
      case 0: this.db.removeTable(this.userId,this.table0);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table0); this.db.writeTitleTable(this.userId,this.table0,"table1"); break;
      case 1: this.db.removeTable(this.userId,this.table1);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table1); this.db.writeTitleTable(this.userId,this.table1,"table2"); break;
      case 2: this.db.removeTable(this.userId,this.table2);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table2); this.db.writeTitleTable(this.userId,this.table2,"table3"); break;
      case 3: this.db.removeTable(this.userId,this.table3);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table3); this.db.writeTitleTable(this.userId,this.table3,"table4"); break;
      case 4: this.db.removeTable(this.userId,this.table4);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table4); this.db.writeTitleTable(this.userId,this.table4,"table5"); break;
      case 5: this.db.removeTable(this.userId,this.table5);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table5); this.db.writeTitleTable(this.userId,this.table5,"table6"); break;
      case 6: this.db.removeTable(this.userId,this.table6);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table6); this.db.writeTitleTable(this.userId,this.table6,"table7"); break;
      case 7: this.db.removeTable(this.userId,this.table7);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table7); this.db.writeTitleTable(this.userId,this.table7,"table8"); break;
      case 8: this.db.removeTable(this.userId,this.table8);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table8); this.db.writeTitleTable(this.userId,this.table8,"table9"); break;
      case 9: this.db.removeTable(this.userId,this.table9);
      this.db.logSave(this.userId,"logDeleteLastTable","delete table",this.table9); this.db.writeTitleTable(this.userId,this.table9,"table10"); break;
    }
    this.db.writeUserNumber(this.userId,this.numbers[0].number)
  }
  addTask(tableName:string):void {
    this.db.kanban=this.projectName;
    const dialogRef = this.dialog.open(AddTaskComponent, {
    width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add task");
          this.db.logSave(this.userId,"logAddTaskFailed","add task","add task failed")
        }
        else{
          this.title=result.value.task.title;
          this.description=result.value.task.description;
          this.priority=result.value.task.priority;
          this.color=result.value.task.color;
          this.endDate=result.value.task.endDate;
          if(this.endDate) this.endData=this.endDate.getDate()+'/'+(this.endDate.getMonth()+1)+'/'+this.endDate.getFullYear();
          else this.endData=null;
          if(this.checkIfTaskTitleIsNotFree(this.title,tableName)) window.alert("Its task title dont free! Use next task title")
           else{
            this.db.kanban=this.projectName
            this.db.writeUserTable(this.userId,tableName,this.replece(this.title),this.title,this.description,this.priority,this.color,this.endData);
           }
            this.db.logSave(this.userId,"logAddTask","add task","add task: "+this.title+" success")
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
          this.db.logSave(this.userId,"logEditTaskFailed","edit task","edit task: "+title+"failed")
        }
        else{  
          this.title=result.value.task.title;
          this.description=result.value.task.description;
          this.priority=result.value.task.priority;
          this.color=result.value.task.color;
          this.endDate=result.value.task.endDate;
          this.endDataString=this.endDate+"";
          if(this.endDataString=="") this.endData="";
          else{
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
          }
            this.db.removeTask(this.userId,tableName,this.replece(title));
            this.db.writeUserTable(this.userId,tableName,this.replece(this.title),this.title,this.description,this.priority,this.color,this.endData);
            this.db.logSave(this.userId,"logEditTask","edit task","task "+title+" success")
        }
      }
    });
  }
  removeTask(removeTask: string,tableName:string):void{
    this.db.logSave(this.userId,"logRemoveTask","remove task","remove task: "+removeTask)
    this.db.removeTask(this.userId,tableName,this.replece(removeTask));
  }
  removeAllTask(tableName:string):void{
    this.db.logSave(this.userId,"logRemoveAllTask","remove all task","remove all task from table: "+tableName)
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
          this.db.logSave(this.userId,"logUpdateTableTitleFailed","update table title ","update table "+title+" failed")
          window.alert("Please correct all errors and resubmit add task");
        }
        else{
          if(result){   
            if(addTable) {
              this.numbers[0].number++;
              this.db.writeUserNumber(this.userId,this.numbers[0].number);
            }
            this.titleTable=result.value.titleTable.title;
            this.db.logSave(this.userId,"logUpdateTableTitle","update Table Title","update table "+title+" success")
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
  saveChanges():void{
    this.db.logSave(this.userId,"logSaveChanges","save changes","save changes")
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
