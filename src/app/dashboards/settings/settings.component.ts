import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userInfo=[];
  fontColor:string;
  background:string;
  info:string;
  userId:string;
  random:string;
  date:Date=new Date();
  currentDate:string;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router) { 
    this.userId=auth.getUser().uid;
  }
  ngOnInit() {
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
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
  updateEmail(updateEmail){
    if(updateEmail.invalid) window.alert("Please try again");
    else{
      this.auth.updateEmail(updateEmail.value.newEmail);
      this.db.updateEmail(this.userId,updateEmail.value.newEmail);
    }
  }
  updatePassword(updatePassword){
    if(updatePassword.invalid) window.alert("Passsword must contain at least 8 charactes,including UPPER/lowercase, and numbers")
    else
    { 
      if(this.matchingPasswords(updatePassword.value.newPassword,updatePassword.value.newRepeatPassword)) this.auth.updatePassowrd(updatePassword.value.newPassword);
    }
  }
  updateThema(updateThema)
  {
    if(updateThema.invalid) window.alert("Please try again");
    else this.db.updateThema(this.userId,updateThema.value.thema);
  }
  matchingPasswords(repeatPassword,password):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to again!';
      return false;
    }
  }
}
