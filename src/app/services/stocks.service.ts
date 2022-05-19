import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, startWith, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

// FIREBASE 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { AuthService } from '../user/auth.service';

export function objectExists(obj: any): boolean {
  return !!obj;
}

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private stockCollection: AngularFirestoreCollection<any>;
  stocks: Observable<any[]>;

  constructor(private firestore: AngularFirestore, public authService: AuthService) {
    this.stockCollection = firestore.collection<any>('stocks');
    this.stocks = this.stockCollection.valueChanges();
  }


  // USER ACCESS 
  readonly currentUser$ = this.authService.user$.pipe(filter(objectExists));

  readonly doesNotHaveSubs$: Observable<boolean | null> = this.currentUser$.pipe(
    filter(objectExists),
    switchMap((user) => {
      const getUserId = firebase.auth().currentUser.uid;
      return new Promise<boolean>((resolve, reject) => {
        // had to update firebase.firestore() to firebase.default.firestore() (from stripe firebase extension docs)
        firebase
          .firestore()
          .collection('users')
          .doc(getUserId)
          .collection('subscriptions')
          .where('status', 'in', ['trialing', 'active'])
          .onSnapshot(async (snapshot) => {
            // In this implementation we only expect one active or trialing subscription to exist.
            // If we get anything back, it means this user has a subscription.
            const doc = snapshot.docs[0];
            if (doc != undefined) {
              resolve(true);
            }
          });
      });
    }),
    startWith(false)
  );

}
