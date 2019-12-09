import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/modal/register/register.component';
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
    public auth:AuthService,
    public db:DataService) { }
 
  captcha:boolean=false;
  numberOfTests:number=0;
  info:string;
  email:string;
  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
    width: '350px',   
});

    dialogRef.afterClosed().subscribe(result => {
      if(result.invalid){
        this.info="Please correct all errors and resubmit the form register";
      }
      else{
      if(this.matchingPasswords(result.value.register.repeatPassword,result.value.register.password)==true)
      {
        this.email=result.value.register.email;
      this.auth.register(result.value.register.email,result.value.register.password)
      .then(()=>this.info="Registration complete. You can login! ")
      .then(()=>this.db.writeUserData(this.auth.getUser().uid,this.email));
    }}});
  }
  loginUser(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
        });

    dialogRef.afterClosed().subscribe(result => {
      if(result==false) this.numberOfTests++;
      else{
      this.auth.login(result.email,result.password).then(() => this.router.navigate(['/dashboard'])).catch(err => this.loginError());
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
