import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import {  MatTableDataSource } from '@angular/material';
export interface Log {
  operation: string;
  data:string;
  title:string;
  description:string;
  priority:string
  color:string;
}
@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css']
})
export class LogiComponent implements OnInit {
  userId:string;
  logs:Log[]=[];
  random:string;
  date:Date=new Date();
  currentDate:string;
  userInfo=[];
  fontColor:string;
  background:string;
  displayedColumns: string[] = ['operation', 'data', 'title', 'description','priority','color'];
  dataLogs: MatTableDataSource<Log>;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router) { 
      this.userId=auth.getUser().uid;
  } 
  ngOnInit() {
    this.db.getLogs(this.userId).subscribe(res => {
      this.logs = res;
      this.dataLogs=new MatTableDataSource(this.logs);
    });
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
  changeBackground():string{
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
  applyFilter(filterValue: string) {
    this.dataLogs.filter = filterValue.trim().toLowerCase();
  }
}
