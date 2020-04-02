import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.afAuth.auth.languageCode = 'de';

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user$.subscribe(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return !!this.afAuth.auth.currentUser !== false;
  }

  async emailSignin(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user);
  }

  async register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['/'], { queryParams: { mode: 'verifyEmail' } });
  }

  async passwordReset(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  async verifyPassword(actionCode: string) {
    return this.afAuth.auth.verifyPasswordResetCode(actionCode);
  }

  async confirmPassword(actionCode: string, password: string) {
    return this.afAuth.auth.confirmPasswordReset(actionCode, password);
  }

  async applyActionCode(actionCode: string) {
    return this.afAuth.auth.applyActionCode(actionCode);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/'], { queryParams: { mode: 'login' } });
  }

}
