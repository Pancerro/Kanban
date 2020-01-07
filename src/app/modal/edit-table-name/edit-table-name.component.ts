import { Component, Inject} from '@angular/core';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-table-name',
  templateUrl: './edit-table-name.component.html',
  styleUrls: ['./edit-table-name.component.css']
})
export class EditTableNameComponent {
  constructor( public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }  
}
  