import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';

@Component({
  selector: 'app-create-new-kanban',
  templateUrl: './create-new-kanban.component.html',
  styleUrls: ['./create-new-kanban.component.css']
})
export class CreateNewKanbanComponent   {

  constructor( public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { } 
}
