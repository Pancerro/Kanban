import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/modal/register/register.component';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/modal/login/login.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent  {
  constructor(public dialog: MatDialog,
    private router: Router,
    public user:User,
    public auth:AuthService,
    public db:DataService) { }
 
  captcha:boolean=false;
  numberOfTests:number=0;
  info:string;
  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
    width: '350px',   
});

    dialogRef.afterClosed().subscribe(result => {
      if(result.invalid){
        this.info="Please correct all errors and resubmit the form register";
      }
      else{
        this.info="Registration complete. You can login! ";
      this.user.password=result.value.register.password;
      this.user.repeatpassword=result.value.register.repeatPassword;
      this.user.email=result.value.register.email;
      if(this.matchingPasswords(this.user.repeatpassword,this.user.password)==true)
      {
      this.auth.register(this.user.email,this.user.password)
      .then(() => 'You failed to register')
      .then(()=>this.db.writeUserData(this.auth.getUser().uid,this.user.email)).catch(err=>console.log());
    }}});
  }
  loginUser(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result==false) this.numberOfTests++;
      else{
      this.user.email = result.email;
      this.user.password=result.password;
      this.auth.login(this.user.email,this.user.password).then(() => this.router.navigate(['/dashboard'])).catch(err => this.loginError());
    }});
  }
  loginError():void{
    this.numberOfTests++;
    this.info="Login Failed.Try Again";
  }
  viewCaptcha():boolean{
    if(this.numberOfTests>=3) return true;
    else return false;
  }
  resolved(captchaResponse):void {
    this.captcha=captchaResponse;
    this.numberOfTests=0;
} 
matchingPasswords(repeatPassword,password):boolean{
  if(repeatPassword.valueOf()==password.valueOf()) return true;
  else {
    this.info='Passwords do not match.Try to register again!';
    return false;
  }
}

}
