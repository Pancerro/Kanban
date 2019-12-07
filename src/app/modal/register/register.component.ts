import { Component, OnInit, Inject } from '@angular/core';
import { WelcomePageComponent } from 'src/app/user/welcome-page/welcome-page.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  captcha:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<WelcomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  resolved(captchaResponse):void {
    this.captcha=captchaResponse;
} 
}
