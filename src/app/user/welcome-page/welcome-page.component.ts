import { Component } from '@angular/core';
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
export class WelcomePageComponent {
  constructor(public dialog: MatDialog,
    private router: Router,
    public user:User,
    public auth:AuthService,
    public db:DataService) { }
 
  captcha:boolean=false;
  numberOfTests:number=0;

  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '330px',
        });

    dialogRef.afterClosed().subscribe(result => {
      this.user.password=result.password;
      this.user.email=result.email;
      this.user.name=result.name;
      this.user.surname=result.surname;
      this.auth.register(this.user.email,this.user.password)
      .then(() => 'You failed to register')
      .then(()=>this.db.writeUserData(this.auth.getUser().uid,this.user.name,this.user.surname,this.user.email))
    });
  }
  loginUser(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
        });

    dialogRef.afterClosed().subscribe(result => {
      this.user.email = result.email;
      this.user.password=result.password;
      this.auth.login(this.user.email,this.user.password).then(() => this.router.navigate(['/dashboard']))
      .catch(err => this.numberOfTests++);
    });
  }
  viewCaptcha():boolean{
    if(this.numberOfTests>=3) return true;
    else return false;
  }
  resolved(captchaResponse):void {
    this.captcha=captchaResponse;
    this.numberOfTests=0;
} 
}
