import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardsComponent } from 'src/app/dashboards/dashboards/dashboards.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { Category } from 'src/app/class/category/category';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  private subscription:Subscription = new Subscription();
  public edit: boolean = true;
  private date: Date = new Date;
  public category: Category[] = [];
  constructor(
    public dialogRef: MatDialogRef<DashboardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private auth: AuthService,
    private db: DataService) { }
  ngOnInit(): void {
    this.subscription=this.db.getCategory(this.auth.getUser().uid).subscribe((category: Category[]) => {
      this.category = category;
    });
  }
  public editTask(): void {
    this.edit = !this.edit;
  }
  public myFilter = (d: Date): boolean => {
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear()
    return day >= this.date.getDate() && month >= this.date.getMonth() && year >= this.date.getFullYear();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
