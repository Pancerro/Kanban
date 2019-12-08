import { Component,  Inject } from '@angular/core';
import { WelcomePageComponent } from 'src/app/user/welcome-page/welcome-page.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  hide:boolean = true;
  captcha:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<WelcomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  resolved(captchaResponse):void {
    this.captcha=captchaResponse;
} 
window(xd){
  console.log(xd.erorek);
}
}
