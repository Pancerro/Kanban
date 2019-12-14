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
mode = this.activatedActivated.snapshot.queryParams['mode'];
code = this.route.snapshot.queryParams['oobCode'];
  constructor( public auth:AuthService,
    private afAuth: AngularFireAuth, 
    private router: Router,
    private route: ActivatedRoute,
    private activatedActivated: ActivatedRoute) { }
  resetUserPassword(updatePassword){
    if(this.matchingPasswords(updatePassword.value.reset.newPassword,updatePassword.value.reset.newRepeatPassword)){
      this.afAuth.auth
  .confirmPasswordReset(this.code,updatePassword.value.reset.newPassword)
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
  verifyMailOrPasswordReset(){
    if(this.mode=="verifyEmail") return "verifyEmail";
    else return "resetPassword";
  }
  login(){
    this.router.navigate(['/welcome-page']);
  }
}
