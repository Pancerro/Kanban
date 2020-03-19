import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';

@Component({
  selector: 'app-delete-option',
  templateUrl: './delete-option.component.html',
  styleUrls: ['./delete-option.component.css']
})
export class DeleteOptionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
