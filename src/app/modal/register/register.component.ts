import { Component } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true;
  public captcha: boolean = false;
  constructor() { }
  public resolved(captchaResponse: boolean): void {
    this.captcha = captchaResponse;
  }
}
