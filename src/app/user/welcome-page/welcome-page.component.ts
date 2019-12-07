import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/modal/register/register.component';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/modal/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog,
    private router: Router,
    public user:User,
    public auth:AuthService) { }
  ngOnInit() {
  }

  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '330px',
        });

    dialogRef.afterClosed().subscribe(result => {
      this.user.password=result.password;
      this.user.email=result.email;
      this.user.name=result.name;
      this.user.surname=result.surname;
      this.user.address=result.address;
      this.auth.register(this.user.email,this.user.password)
    });
  }
  loginUser(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
        });

    dialogRef.afterClosed().subscribe(result => {
      this.user.email = result.login;
      this.user.password=result.password;
      this.auth.login(this.user.email,this.user.password).then(() => this.router.navigate(['/dashboard']))
      .catch(err =>  'WRONG EMAIL OR PASSWORDS');
    });
  }
}
