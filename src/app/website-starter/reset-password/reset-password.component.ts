import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  ngOnInit(){
    this.mode = this.activatedActivated.snapshot.queryParams['mode'];
    this.code = this.route.snapshot.queryParams['oobCode'];
  }
  info:string;
  hide:boolean = true;
  emailVerify: boolean=false;
  mode:string
  code:string; 
  constructor( public auth:AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public activatedActivated: ActivatedRoute) {}
  emailVerificate():void{
    this.auth.changeEmailVerifity(this.code);
    this.router.navigate(['/welcome-page']);
  }
  resetUserPassword(updatePassword):void{
    if(this.matchingPasswords(updatePassword.value.reset.newPassword,updatePassword.value.reset.newRepeatPassword)){
      this.auth.userResetPassword(this.code,updatePassword.value.reset.newPassword)
      .then(() => this.router.navigate(['welcome-page']))
    }
  }
  matchingPasswords(repeatPassword,password):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to again!';
      return false;
    }
  }
  verifyMailOrPasswordReset():boolean{
    if(this.mode=="verifyEmail") return true;
    else return false;
  }
}
