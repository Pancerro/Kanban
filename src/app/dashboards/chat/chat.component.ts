import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DashboardsComponent } from '../dashboards/dashboards.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';

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
  date:Date; 
  currentDate:string;
  viewMessage=[];
  shareFriends=[];

  constructor(private _bottomSheetRef: MatBottomSheetRef<DashboardsComponent>,
    private auth:AuthService,
    private db:DataService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
     }
  
  ngOnInit() { 
    this.projectName=this.data.projectName;
    this.userId=this.data.userId;
    this.db.getDateUser(this.auth.getUser().uid).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getMessage(this.userId,this.projectName).subscribe(res=>{
      console.log("1")
      this.viewMessage=res
    })
    this.db.getShareFriends(this.userId).subscribe(res=>this.shareFriends=res);
    
  
  }
  inreplece(replace:string):string{
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
replece(replace:string):string{
  this.word="";
  for(let letter of replace)
  {
    letter=letter.replace(".","@1@");
    letter=letter.replace("#","@2@");      
    letter=letter.replace("$","@3@");
    letter=letter.replace("[","@4@");
    letter=letter.replace("]","@5@");
    this.word=this.word+letter;
  }
  return this.word;
}
checkShare(email,projectName){
  
  this.db.kanban=projectName
  for(let item of this.shareFriends){
    if(item.friendsEmail==email){
      this.db.kanban=localStorage.getItem("lastTable")
      return true;
    }
}
}
sendMessage(message,formReset){
  this.db.kanban=this.projectName;
  this.db.writeMessage(this.userId,this.userInfo[0].email,this.db.kanban,this.getDate(),message)
  this.db.getMessage(this.userId,this.projectName).subscribe(res=>this.viewMessage=res)
  formReset.resetForm();
  this.db.logSave(this.userId,"Send message","chat","send message");
}
getDate(){
  this.date=new Date;
  this.currentDate=(this.date.getDate()+'/'+this.db.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.db.zero(this.date.getHours())+this.date.getHours()+':'+this.db.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.db.zero(this.date.getSeconds())+this.date.getSeconds()+':'+this.db.zero(this.date.getMilliseconds())+ this.date.getMilliseconds());
  return this.currentDate;
}
}
