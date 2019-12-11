import { Component, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';

@Component({
  selector: 'app-edit-table-name',
  templateUrl: './edit-table-name.component.html',
  styleUrls: ['./edit-table-name.component.css']
})
export class EditTableNameComponent {
  constructor() {}
}
