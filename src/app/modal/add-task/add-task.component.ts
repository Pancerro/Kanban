import { Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  userId:string;
  date:Date=new Date;
  category=[];
  constructor(
    private auth:AuthService,
    private db:DataService) { 
    this.userId=auth.getUser().uid;
  } 
  ngOnInit() {
    this.db.getCategory(this.userId).subscribe(res => {
      this.category = res;
    });
  } 
  myFilter = (d: Date): boolean => {
    const day = d.getDate();
    const month=d.getMonth();
    const year=d.getFullYear()
    return day>=this.date.getDate() && month>=this.date.getMonth() &&year>=this.date.getFullYear();
  }
}



