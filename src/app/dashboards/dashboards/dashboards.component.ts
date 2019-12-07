import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent  {

  constructor(
    private auth:AuthService,
    private router: Router,
    ) { }
  verifyEmail=this.auth.user.emailVerified;
  logout(){
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }

}
