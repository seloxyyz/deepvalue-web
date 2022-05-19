import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// FIREBASE 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit {

  private cryptoCollection: AngularFirestoreCollection<any>;
  cryptos: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.cryptoCollection = firestore.collection<any>('cryptos');
    this.cryptos = this.cryptoCollection.valueChanges();
  }

  ngOnInit(): void {

  }
  
}
