import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide: boolean = true;
  constructor(
    private auth: AuthService) { }
  public resetPassword(email: string): void {
    this.auth.resetPassword(email)
      .catch(() => { window.alert("eh! error, please try to again") })
  }
}
