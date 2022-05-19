import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { StocksService } from '../services/stocks.service';
import firebase from 'firebase/app';
import 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.scss']
})
export class ProComponent implements OnInit {
  
  constructor(public authService: AuthService, public stocksService: StocksService) { }

  ngOnInit(): void {}

  async Checkout() {
    const getUserId = firebase.auth().currentUser.uid;

    firebase.firestore.setLogLevel('debug');

    await firebase
      .firestore()
      .collection('users')
      .doc(getUserId)
      .collection('checkout_sessions')
      .add({
        price: 'price_1J43c7G25GiEUI0ttGANuY7d', // todo price Id from your products price in the Stripe Dashboard
        success_url: window.location.origin, // return user to this screen on successful purchase
        cancel_url: window.location.origin // return user to this screen on failed purchase
      })
      .then((docRef) => {
        // Wait for the checkoutSession to get attached by the extension
        docRef.onSnapshot(async (snap) => {
          const { error, sessionId } = snap.data();
          if (error) {
            // Show an error to your customer and inspect
            // your Cloud Function logs in the Firebase console.
            alert(`An error occurred: ${error.message}`);
          }

          if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = await loadStripe(
              'pk_test_ZmQh5sM7jA8CIcPD3LxXTCWq' // todo enter your public stripe key here
            );
            await stripe.redirectToCheckout({ sessionId });
          }
        });
      });
  }

  async CustomerPortal() {
    // had to update firebase.app().functions() to firebase.default.functions() and
    // removed the region from the functions call (from stripe firebase extension docs)
    const functionRef = firebase
      .functions()
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({ returnUrl: window.location.origin });
    window.location.assign(data.url);
  }
}
