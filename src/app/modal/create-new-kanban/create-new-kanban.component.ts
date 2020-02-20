import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsComponent } from 'src/app/dashboards/settings/settings.component';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';

@Component({
  selector: 'app-create-new-kanban',
  templateUrl: './create-new-kanban.component.html',
  styleUrls: ['./create-new-kanban.component.css']
})
export class CreateNewKanbanComponent implements OnInit  {
  ngOnInit(): void {
  }

  constructor( public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { } 
}
