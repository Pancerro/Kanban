import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  edit:boolean=true;
  editText:string="Edit text";
  constructor(
    public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private auth:AuthService,
    private db:DataService) {}
    editTask(){
      this.edit=!this.edit;
    }
}
