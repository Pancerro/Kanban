import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WelcomePageComponent } from 'src/app/user/welcome-page/welcome-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide:boolean = true;
  constructor(
    private router: Router,
    private db:DataService,
    public dialogRef: MatDialogRef<WelcomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private auth:AuthService) {} 
  resetPassword(email:string):void{
    this.auth.resetPassword(email)
    .catch(() => {window.alert("eh! error, please try to again")})
  }
}
