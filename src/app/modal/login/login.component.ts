import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WelcomePageComponent } from 'src/app/user/welcome-page/welcome-page.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public dialogRef: MatDialogRef<WelcomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
   private auth:AuthService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  resetPassword(email){
    this.auth.resetPassword(email);
  }
}
