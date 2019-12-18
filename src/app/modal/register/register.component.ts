import { Component,  Inject } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  hide:boolean = true;
  captcha:boolean=false;
  red="red";
  constructor() {}
  resolved(captchaResponse):void {
    this.captcha=captchaResponse;
  } 
}
