import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide:boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private auth:AuthService) {} 
  resetPassword(email:string):void{
    this.auth.resetPassword(email)
    .catch(() => {window.alert("eh! error, please try to again")})
  }
}
