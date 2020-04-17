import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{
  ngOnInit(): void {
   if(localStorage.getItem("menu")=="Logi") this.logClicked=true;
   if(localStorage.getItem("menu")=="UserSettings") this.userSettingClicked=true;
   if(localStorage.getItem("menu")=="KanbanTable") this.kanbanClicked=true;
  }
logClicked:boolean=false;
kanbanClicked:boolean=false;
userSettingClicked:boolean=false;
sharingClicked:boolean=false;
userId:string;
word:string;
constructor(
  private auth:AuthService,
  private db:DataService,
  private router: Router,
  private titleService: Title
) {
    this.userId=auth.getUser().uid;
  }
  logout():void{
    this.titleService.setTitle("You are logout");
    this.db.logSave(this.userId,"logOut","log out","log out")
    this.db.updateOnline(this.replece(this.auth.getUser().email),false);
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }

  sharingOption(){
    this.router.navigate(['/sharing-option']);
  }
  logs():void{
    this.router.navigate(['/logi']);
  }
  settings():void{
    this.router.navigate(['/settings']);
  }
  dashboard():void{
    this.router.navigate(['/dashboard']);
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
}
