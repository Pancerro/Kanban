import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs/index';

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  constructor(
    private fireAuth: AngularFireAuth) {}
  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }
  login(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register(email, password) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.SendVerificationMail();
      window.alert('You can now log in!');
    }).catch((error) => {
      window.alert(error.message);
    })
  }
  SendVerificationMail() {
    return this.fireAuth.auth.currentUser.sendEmailVerification();
  }
  logout() {
    return this.fireAuth.auth.signOut();
  }
  resetPassword(email){
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }
}