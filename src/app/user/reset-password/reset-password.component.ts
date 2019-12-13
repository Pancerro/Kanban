import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
info:string;
code: any;
hide:boolean = true;
verifyEmail=this.auth.getUser().emailVerified;
  constructor( public auth:AuthService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
  }

  resetUserPassword(updatePassword){
    console.log(updatePassword.value.reset.newPassword)
    console.log(updatePassword.value.reset.newRepeatPassword)
    if(this.matchingPasswords(updatePassword.value.reset.newPassword,updatePassword.value.reset.newRepeatPassword)){
    this.code = this.route.snapshot.queryParams['oobCode'];
    this.auth.userResetPassword(this.code,updatePassword.value.newPassword).then(() => this.router.navigate(['welcome-page']))
    .catch(err => {
     window.alert("hehe errror")});
    }
    else{ window.alert("hehe error xDDD kisne");}
  }
  matchingPasswords(repeatPassword,password):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to register again!';
      return false;
    }
  }
}
