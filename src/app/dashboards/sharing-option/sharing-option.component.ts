import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-sharing-option',
  templateUrl: './sharing-option.component.html',
  styleUrls: ['./sharing-option.component.css']
})
export class SharingOptionComponent implements OnInit {
  word:string;
  userInfo=[];
  userId:string;
  shareFriends=[];
  myFriend=[];
  projectName:string;
  view="Viewer"
  constructor(
    private auth:AuthService,
    private db:DataService,
    private route: ActivatedRoute

  ) {
      this.userId=auth.getUser().uid;
    }

  ngOnInit() {
    localStorage.setItem("menu","sharing-option")
   this.route.paramMap.forEach(({params}:Params)=>{
      this.projectName = params['projectName']
      this.db.kanban=params['projectName']
  }) 
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getShareFriends(this.userId).subscribe(res=>this.shareFriends=res);
    this.db.getAllMyFriends(this.userId).subscribe(res=>{
      this.myFriend=res;
    })
    
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

stopShareProject(projectName){
  this.db.deleteChatMesage(this.userId,projectName);
  this.db.kanban=projectName; 
  this.db.getShareFriends(this.userId).subscribe(res=>{this.shareFriends=res});
  for(let item of this.shareFriends){
    if(item.friendsEmail==this.replece(this.userInfo[0].email)) console.log("")
    else this.db.writeDelete(this.userId,item.friendsEmail,item.friendsId);      
    this.db.removeShare(item.friendsId,projectName); 
    this.db.removeShareFriends(this.userId,item.friendsEmail) 
    this.db.updateShare(this.userId,projectName,false);
  } 
  this.db.kanban=localStorage.getItem("lastTable")
  this.db.logSave(this.userId,"Stop share","share","stop share project "+projectName);
}

shareTable(item,projectName,role){
  //edit
  this.db.kanban=projectName
  this.db.writeShareFriends(this.userId,item.friendsEmail,item.friendsId,role);
  this.db.share(item.friendsId,this.userId,projectName)   
  this.db.removeDelete(this.userId,item.friendsEMail);
  this.db.kanban=localStorage.getItem("lastTable")
  this.db.logSave(this.userId,"Start share project","share","Start share project "+projectName+" for "+item.friendsEmail);
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
  this.db.writeDelete(this.userId,friends.friendsEmail,friends.friendsId)
  this.db.removeShare(friends.friendsId,projectName)
  this.db.kanban=localStorage.getItem("lastTable")
  this.db.logSave(this.userId,"Stop share project","share","Stop share project "+projectName+" for "+friends.friendsEmail);
}

}
