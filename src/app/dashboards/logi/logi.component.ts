import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css']
})
export class LogiComponent implements OnInit {
  userId:string;
  logs=[];
  random:string;
  date:Date=new Date();
  currentDate:string;
  userInfo=[];
  fontColor;
  background;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router) { 
      this.userId=auth.getUser().uid;
    }
  ngOnInit() {
    this.db.getLogs(this.userId).subscribe(res => {
      this.logs = res;
      this.db.getDateUser(this.userId).subscribe(res => {
        this.userInfo = res;
      });
    });
  }
  changeFont():string
  {
    if(this.userInfo[0].thema=="green"){
    this.fontColor="white";
    return this.fontColor;
    }
    if(this.userInfo[0].thema=="black"){
    this.fontColor="white";
    return this.fontColor;
    }
  }
  changeBackground(){
    if(this.userInfo[0].thema=="green"){
      this.background="green";
      return this.background;
      }
      if(this.userInfo[0].thema=="black"){
      this.background="black";
      return this.background;
      }
  }
  logout():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logOut");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"log out","log out","","","","");
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }
  return():void{
    this.router.navigate(['/dashboard']);
  }

}
