import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public hide: boolean = true;
  private mode: string
  private code: string;
  public ngOnInit() {
    this.mode = this.activatedActivated.snapshot.queryParams['mode'];
    this.code = this.route.snapshot.queryParams['oobCode'];
  }
  constructor(public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public activatedActivated: ActivatedRoute) { }
  public emailVerificate(): void {
    this.auth.changeEmailVerifity(this.code);
    this.router.navigate(['/welcome-page']);
  }
  public resetUserPassword(updatePassword: { newPassword: string; newRepeatPassword: string; }): void {
    if (this.matchingPasswords(updatePassword.newPassword, updatePassword.newRepeatPassword)) {
      this.auth.userResetPassword(this.code, updatePassword.newPassword)
        .then(() => this.router.navigate(['welcome-page']))
    }
  }
  private matchingPasswords(repeatPassword: string, password: string): boolean {
    if (repeatPassword.valueOf() == password.valueOf()) return true;
    else {
      document.getElementById("info").innerHTML = 'Passwords do not match.Try to again!';
      return false;
    }
  }
  public verifyMailOrPasswordReset(): boolean {
    if (this.mode == "verifyEmail") return true;
    else return false;
  }
  public clear(): void {
    document.getElementById("info").innerHTML = "";
  }
  public return(): void {
    this.router.navigate(['welcome-page']);
  }
}
