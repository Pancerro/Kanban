import { Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { Category } from 'src/app/class/category/category';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  private date:Date=new Date;
  private subscription:Subscription = new Subscription();
  public category:Category[]=[];
  constructor(
    private auth:AuthService,
    private db:DataService) { 
  } 
  ngOnInit() {
    this.subscription=this.db.getCategory(this.auth.getUser().uid).subscribe((category:Category[]) => {
      this.category = category;
    });
  } 
  public myFilter = (d: Date): boolean => {
    const day = d.getDate();
    const month=d.getMonth();
    const year=d.getFullYear()
    return day>=this.date.getDate() && month>=this.date.getMonth() &&year>=this.date.getFullYear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



