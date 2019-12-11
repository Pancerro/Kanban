import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  edit:boolean=true;
  constructor(
    public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
    editTask(){
      this.edit=!this.edit;
    }
}
