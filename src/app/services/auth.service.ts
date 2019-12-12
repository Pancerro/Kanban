import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs/index';
@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  this: any;
  constructor(private fireAuth: AngularFireAuth) {}
  getUser(): User | null {
    return this.fireAuth.auth.currentUser;
  }
  login(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  register(email, password) {
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
  resetPassword(email){
    return this.fireAuth.auth.sendPasswordResetEmail(email).catch((error) => {
      window.alert(error.message);
    })
  }
  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }  
  AuthLogin(provider) {
    return this.fireAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!');
    }).catch((error) => {
        console.log(error);
    })
  }
  updateEmail(newEmail){
    return this.fireAuth.auth.currentUser.updateEmail(newEmail).catch((error) => {
      window.alert(error.message);
    })
  }
  updatePassowrd(newPassword){
    return this.fireAuth.auth.currentUser.updatePassword(newPassword).catch((error) => {
      window.alert(error.message);
    })
  }
}