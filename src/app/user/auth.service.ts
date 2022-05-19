import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

// FIREBASE
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface User {
  uid: String,
  email: String,
  displayName: String,
  photoURL: String,
  emailVerified: Boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore, public router: Router,
    public ngZone: NgZone) {

    this.isUserLoggedIn();

  }

  isUserLoggedIn() {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  // AUTH
  async googleSignin() {
    // firebase.firestore.setLogLevel('debug');
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    return userRef.set(data, { merge: true })
  }

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }
}
