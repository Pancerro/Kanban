import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/modal/register/register.component';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public user:User) { }
  ngOnInit() {
  }

  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '330px',
        });

    dialogRef.afterClosed().subscribe(result => {
      this.user.login=result.login;
      this.user.password=result.password;
      this.user.email=result.email;
      this.user.name=result.name;
      this.user.surname=result.surname;
      this.user.address=result.address;
    });
  }

}
