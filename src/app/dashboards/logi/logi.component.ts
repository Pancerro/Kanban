import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { MatTableDataSource } from '@angular/material';
import { Log } from 'src/app/class/log/log';
import { UserDate } from 'src/app/class/userDate/user-date';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css']
})
export class LogiComponent implements OnInit {
  private subsrciption: Subscription = new Subscription();
  private userId: string;
  public logs: Log[] = [];
  public fontColor: string;
  public background: string;
  public displayedColumns: string[] = ['type', 'data', 'description'];
  public dataLogs: MatTableDataSource<Log>;
  public sort: Boolean[] = [true, true, true];
  public imgSort: string[] = ["", "", ""];
  constructor(
    private titleService: Title,
    private auth: AuthService,
    private db: DataService) {
    this.userId = auth.getUser().uid;
  }
  public ngOnInit(): void {
    this.titleService.setTitle("Logs");
    localStorage.setItem("menu", "Logs");
    this.subsrciption.add(this.db.getLogs(this.userId).subscribe((log: Log[]) => {
      this.dataLogs = new MatTableDataSource(log);
    }));
    this.subsrciption.add(this.db.getDateUser(this.userId).subscribe((userDate: UserDate[]) => {
      this.fontColor = this.db.changeFont(userDate[0].thema);
      this.background = this.db.changeBackground(userDate[0].thema);
    }));
  }
  public applyFilter(filterValue: string): void {
    this.dataLogs.filter = filterValue.trim().toLowerCase();
  }
  public sortByType(): void {
    this.imgSort[1] = "";
    this.imgSort[2] = "";
    this.sort[1] = true;
    this.sort[2] = true;
    this.subsrciption.add(this.db.sortLogByType(this.userId).subscribe((log: Log[]) => {
      if (this.sort[0]) {
        this.imgSort[0] = "assets/1.png";
        this.dataLogs = new MatTableDataSource(log);
        this.sort[0] = false;
      }
      else {
        this.imgSort[0] = "assets/2.png";
        this.dataLogs = new MatTableDataSource(log.reverse());
        this.sort[0] = true;
      }
    }));
  }
  public sortByDate(): void {
    this.imgSort[0] = "";
    this.imgSort[2] = "";
    this.sort[0] = true;
    this.sort[2] = true;
    this.subsrciption.add(this.db.sortLogByDate(this.userId).subscribe((log: Log[]) => {
      if (this.sort[1]) {
        this.imgSort[1] = "assets/1.png";
        this.dataLogs = new MatTableDataSource(log);
        this.sort[1] = false;
      }
      else {
        this.imgSort[1] = "assets/2.png";
        this.dataLogs = new MatTableDataSource(log.reverse());
        this.sort[1] = true;
      }
    }));
  }
  public sortByDescription(): void {
    this.imgSort[0] = "";
    this.imgSort[1] = "";
    this.sort[0] = true;
    this.sort[1] = true;
    this.subsrciption.add(this.db.sortLogByDescription(this.userId).subscribe((log: Log[]) => {
      if (this.sort[2]) {
        this.imgSort[2] = "assets/1.png";
        this.dataLogs = new MatTableDataSource(log);
        this.sort[2] = false;
      }
      else {
        this.imgSort[2] = "assets/2.png";
        this.dataLogs = new MatTableDataSource(log.reverse());
        this.sort[2] = true;
      }
    }));
  }


  public ngOnDestroy(): void {
    this.subsrciption.unsubscribe();
  }
}
