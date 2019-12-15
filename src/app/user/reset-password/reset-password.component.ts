import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent{
info:string;
hide:boolean = true;
emailVerify: boolean=false;
mode = this.activatedActivated.snapshot.queryParams['mode'];
code = this.route.snapshot.queryParams['oobCode'];
  activatedRoute: ActivatedRoute;
  emailVerificationCode: any;

  constructor( public auth:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedActivated: ActivatedRoute,
    private firebase: AngularFireAuth) {
    }
  

  emailVerificate(){
    this.firebase.auth.applyActionCode(this.code)
    .then(() => this.firebase.auth.currentUser.emailVerified=true)
    .then(() => this.router.navigate(['welcome-page']))
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
  verifyMailOrPasswordReset():string{
    if(this.mode=="verifyEmail") return "verifyEmail";
    else return "resetPassword";
  }
  login():void{
    this.router.navigate(['/welcome-page']);
  }
}
