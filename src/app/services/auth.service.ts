import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs/index';
@Injectable({providedIn: 'root'})
export class AuthService {
  user = this.fireAuth.auth.currentUser;
  
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  constructor(private fireAuth: AngularFireAuth) {}
  getUser(): User | null {
    return this.fireAuth.auth.currentUser;
  }
  login(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  register(email: string, password: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.sendVerificationMail();
    }).catch((error) => {
      window.alert(error.message);
    })
  }
  sendVerificationMail() {
    return this.fireAuth.auth.currentUser.sendEmailVerification();
  }
  logout() {
    return this.fireAuth.auth.signOut();
  }
  resetPassword(email: string){
    return this.fireAuth.auth.sendPasswordResetEmail(email)
    .then(()=>window.alert("Check your email!"))
    .catch((error) => {
      window.alert(error.message);
    })
  }
  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }  
  AuthLogin(provider: auth.AuthProvider) {
    return this.fireAuth.auth.signInWithPopup(provider)
  }
  updateEmail(newEmail: string){
    return this.fireAuth.auth.currentUser.updateEmail(newEmail).catch((error) => {
      window.alert(error.message);
    })
  }
  updatePassowrd(newPassword: string){
    return this.fireAuth.auth.currentUser.updatePassword(newPassword).catch((error) => {
      window.alert(error.message);
    });
  }
  deleteUser(){
    return this.fireAuth.auth.currentUser.delete();
  }
  userResetPassword(code: string,password: string){
    return this.fireAuth.auth.confirmPasswordReset(code,password);
  }
  changeEmailVerifity(code: string){
    return this.fireAuth.auth.applyActionCode(code);
  }
}