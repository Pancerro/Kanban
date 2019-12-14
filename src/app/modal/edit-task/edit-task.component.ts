import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  edit:boolean=true;
  date:Date=new Date;
  userId:string;
  category=[];
  constructor(
    public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private auth:AuthService,
    private db:DataService) {
      this.userId=auth.getUser().uid;
    }
  ngOnInit() {
    this.db.getCategory(this.userId).subscribe(res => {
        this.category = res;
    });
  } 
  editTask():void{
    this.edit=!this.edit;
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDate();
    const month=d.getMonth();
    const year=d.getFullYear()
    return day>=this.date.getDate() && month>=this.date.getMonth() &&year>=this.date.getFullYear();
  }
}
