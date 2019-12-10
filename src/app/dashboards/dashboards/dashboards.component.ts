import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  ngOnInit(){
    this.db.getTask(this.userId,"to").subscribe(res => {
      this.toTable = res;
    });
    this.db.getTask(this.userId,"do").subscribe(res => {
      this.doTable = res;
    });
    this.db.getTask(this.userId,"done").subscribe(res => {
      this.doneTable = res;
    });
  }
  verifyEmail=this.auth.getUser().emailVerified;
  user:Observable<any[]>;
  to:Observable<any[]>
  do:Observable<any[]>;
  toTable=[];
  doTable=[];
  doneTable=[];
  done:Observable<any[]>;
  userId:string;
  x;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router,
    public dialog: MatDialog,
    ) {
      this.userId=auth.getUser().uid;
      this.user=db.getDateUser(auth.getUser().uid);
      this.to=this.db.getTask(this.userId,"to");
      this.do=this.db.getTask(this.userId,"do");
      this.done=this.db.getTask(this.userId,"done");
    }
    saveChanges():void{
      for(let d of this.doTable){
        this.db.writeUserTable(this.userId,"do",d.title,d.title,d.description,d.priority);
      }
    }
    cancelChanges():void{
      window.location.reload();
    }
    addTo(): void {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '250px',
          });
  
      dialogRef.afterClosed().subscribe(result => {
        this.db.writeUserTable(this.userId,"to",result.title,result.title,result.description,result.priority);
      });
    }
    addDo(): void {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '250px',
          });
  
      dialogRef.afterClosed().subscribe(result => {
        this.db.writeUserTable(this.userId,"do",result.title,result.title,result.description,result.priority);
      });
    }
    addDone(): void {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '250px',
          });
  
      dialogRef.afterClosed().subscribe(result => {
        this.db.writeUserTable(this.userId,"done",result.title,result.title,result.description,result.priority);
      });
    }
  logout():void{
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
