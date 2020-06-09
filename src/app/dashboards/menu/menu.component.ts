import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Log } from 'src/app/class/log/log';
import { AllUser } from 'src/app/class/allUser/all-user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private userId: string;
  public header: string = "";
  public ngOnInit(): void {
    this.header = localStorage.getItem("menu");
  }
  constructor(
    private auth: AuthService,
    private db: DataService,
    private router: Router,
    private titleService: Title
  ) {
    this.userId = auth.getUser().uid;
  }

  public logout(): void {
    this.titleService.setTitle("You are logout");
    this.db.logSave(new Log(this.userId, "logOut", "log out", "log out"))
    this.db.updateOnline(new AllUser(this.userId, this.db.replece(this.auth.getUser().email), false));
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }

  public sharingOption(): void {
    this.router.navigate(['/sharing-option']);
  }
  public logs(): void {
    this.router.navigate(['/logi']);
  }
  public settings(): void {
    this.router.navigate(['/settings']);
  }
  public dashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
