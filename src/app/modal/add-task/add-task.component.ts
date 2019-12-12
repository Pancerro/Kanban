import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  constructor() {}
  date:Date=new Date;
  myFilter = (d: Date): boolean => {
    const day = d.getDate();
    const month=d.getMonth();
    const year=d.getFullYear()
    return day>=this.date.getDate() && month>=this.date.getMonth() &&year>=this.date.getFullYear();
  }
}



