import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DashboardsComponent } from '../dashboards/dashboards.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { Log } from 'src/app/class/log/log';
import { AllChat } from 'src/app/class/allChat/all-chat';
import { Project } from 'src/app/class/project/project';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  word:string;
  projectName:string;
  userId:string;
  userInfo=[]; 
  viewMessage=[];
  shareFriends=[];

  constructor(private _bottomSheetRef: MatBottomSheetRef<DashboardsComponent>,
    private auth:AuthService,
    public db:DataService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
     }
  
  ngOnInit() { 
    this.projectName=this.data.projectName;
    this.userId=this.data.userId;
    this.db.getDateUser(this.auth.getUser().uid).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getMessage(new Project(this.userId,this.projectName,null)).subscribe(res=>{
      this.viewMessage=res
    })
    this.db.getShareFriends(this.userId).subscribe(res=>this.shareFriends=res);
    
  
  }
public inreplece(replace:string):string{
    this.word=replace
    for(let letter of replace){
    this.word=this.word.replace("@1@",".");
    this.word=this.word.replace("@2@","#");      
    this.word=this.word.replace("@3@","$");
    this.word=this.word.replace("@4@","]");
    this.word=this.word.replace("@5@","["); 
    }
  return this.word;
}

public checkShare(email:string,projectName:string){
  
  this.db.kanban=projectName
  for(let item of this.shareFriends){
    if(item.friendsEmail==email){
      this.db.kanban=localStorage.getItem("lastTable")
      return true;
    }
}
}
public sendMessage(message:string,formReset){
  this.db.kanban=this.projectName;
  this.db.writeMessage(new AllChat(this.userId,this.userInfo[0].email,this.db.kanban,"DATA",message));
  this.db.getMessage(new Project(this.userId,this.projectName,null)).subscribe(res=>this.viewMessage=res);
  formReset.resetForm();
  this.db.logSave(new Log(this.userId,"Send message","chat","send message"));
}
}
