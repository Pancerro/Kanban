import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import {  MatTableDataSource } from '@angular/material';
export interface Log {
  type: string;
  data:string;
  description:string;
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
  displayedColumns: string[] = ['operation', 'data','description'];
  dataLogs: MatTableDataSource<Log>;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router) { 
      this.userId=auth.getUser().uid;
  } 
  ngOnInit():void {
    this.db.getLogs(this.userId).subscribe(res => {
      this.logs = res;
      this.dataLogs=new MatTableDataSource(this.logs);
    });
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
  } 
  zero(date){
    if(date<10) return 0;
    return "";
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
  logout():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logOut");
    this.date=new Date;
    this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"log out","log out");
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }
  return():void{
    this.router.navigate(['/dashboard']);
  }
  applyFilter(filterValue: string) {
    this.dataLogs.filter = filterValue.trim().toLowerCase();
  }
  sortO=true ;
  sortByOperation(){
    this.dataLogs=new MatTableDataSource(this.logs)
    if(this.sortO){
    this.dataLogs= new MatTableDataSource(this.logs.sort((a,b)=>a.type<b.type?-1:1))
    this.sortO=false;
    }
    else{
    this.dataLogs= new MatTableDataSource(this.logs.sort((a,b)=>a.type>b.type?-1:1))
    this.sortO=true; 
    }
  }
  sortDesc=true
  sortByDescription(){
    this.dataLogs=new MatTableDataSource(this.logs)
    if(this.sortDesc){
    this.dataLogs= new MatTableDataSource(this.logs.sort((a,b)=>a.description<b.description?-1:1))
    this.sortDesc=false;
    } else {
      this.dataLogs= new MatTableDataSource(this.logs.sort((a,b)=>a.description>b.description?-1:1))
      this.sortDesc=true;
    }
  }
  sortD=true
  sortByDate(){
    this.dataLogs=new MatTableDataSource(this.logs)
    if(this.sortD){
      this.dataLogs= new MatTableDataSource(this.logs.sort((a,b)=>a.data<b.data?-1:1))
      this.sortD=false;
    } else{
      this.dataLogs= new MatTableDataSource(this.logs.sort((a,b)=>a.data>b.data?-1:1))
      this.sortD=true;
    }
  }
 
}
