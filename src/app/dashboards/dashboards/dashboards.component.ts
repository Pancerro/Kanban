import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent  {
  verifyEmail=this.auth.getUser().emailVerified;
  user:Observable<any[]>;
  constructor(
    private auth:AuthService,
    private db:DataService,
    private router: Router,
    ) { 
      this.user=db.getDateUser(this.auth.getUser().uid);
    }
 
  logout(){
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }

}
