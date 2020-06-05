import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs/index';
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  constructor(private fireAuth: AngularFireAuth) { }
  public getUser(): User | null {
    return this.fireAuth.auth.currentUser;
  }
  public login(email: string, password: string): Promise<auth.UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  public async register(email: string, password: string): Promise<void> {
    try {
      await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationMail();
    }
    catch (error) {
      window.alert(error.message);
    }
  }
  public sendVerificationMail(): Promise<void> {
    return this.fireAuth.auth.currentUser.sendEmailVerification();
  }
  public logout(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }
  public async resetPassword(email: string): Promise<void> {
    try {
      await this.fireAuth.auth.sendPasswordResetEmail(email);
      return window.alert("Check your email!");
    }
    catch (error) {
      window.alert(error.message);
    }
  }
  public googleAuth(): Promise<auth.UserCredential> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }
  public authLogin(provider: auth.AuthProvider): Promise<auth.UserCredential> {
    return this.fireAuth.auth.signInWithPopup(provider)
  }
  public async updateEmail(newEmail: string): Promise<void> {
    try {
      return this.fireAuth.auth.currentUser.updateEmail(newEmail);
    }
    catch (error) {
      window.alert(error.message);
    }
  }
  public async updatePassowrd(newPassword: string): Promise<void> {
    try {
      return this.fireAuth.auth.currentUser.updatePassword(newPassword);
    }
    catch (error) {
      window.alert(error.message);
    }
  }
  public deleteUser(): Promise<void> {
    return this.fireAuth.auth.currentUser.delete();
  }
  public userResetPassword(code: string, password: string): Promise<void> {
    return this.fireAuth.auth.confirmPasswordReset(code, password);
  }
  public changeEmailVerifity(code: string): Promise<void> {
    return this.fireAuth.auth.applyActionCode(code);
  }
}