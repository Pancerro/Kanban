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
  date:Date;
  currentDate:string;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router) { 
      this.userId=auth.getUser().uid;
    }
  ngOnInit() {
    this.db.getLogs(this.userId).subscribe(res => {
      this.logs = res;
    });
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
