import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

// FIREBASE 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  private stockCollection: AngularFirestoreCollection<any>;
  stocks: Observable<any[]>;
  stonks: any;

  constructor(private firestore: AngularFirestore, private https: HttpClient) {
    this.stockCollection = firestore.collection<any>('stocks');
    this.stocks = this.stockCollection.valueChanges();
  }

  ngOnInit(): void {

  }

}
