import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent{
info:string;
code: any;
hide:boolean = true;
verifyEmail=this.auth.getUser().emailVerified;
  constructor( public auth:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute) { }
  resetUserPassword(updatePassword){
    if(this.matchingPasswords(updatePassword.value.reset.newPassword,updatePassword.value.reset.newRepeatPassword)){
      this.code = this.route.snapshot.queryParams['oobCode'];
      this.auth.userResetPassword(this.code,updatePassword.value.newPassword)
      .then(()=>this.info="You can login now ")
      .then(() => this.router.navigate(['welcome-page']))
      .catch(err => {
       window.alert("eh! error, please try to again")});
    }
    else window.alert("eh! error, please try to again");
  }
  matchingPasswords(repeatPassword,password):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to again!';
      return false;
    }
  }
}
