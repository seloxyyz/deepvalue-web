import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Tile, ChartData, BlockchainData, SparklineIn7d, RootObject } from '../services/crypto'

// CHARTJS
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color, BaseChartDirective, } from 'ng2-charts';


@Component({
  selector: 'app-crypto-page',
  templateUrl: './crypto-page.component.html',
  styleUrls: ['./crypto-page.component.scss']
})
export class CryptoPageComponent implements OnInit {
  crypto$;

  // API
  cryptoProfiles: any;
  cryptoCharts: any; //maybe not needed
  cryptoDatas: any;
  cryptoPrices: any;
  chart: any;

  constructor(private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private https: HttpClient,
    public router: Router) {
  }

  ngOnInit(): void {
    this.FirestoreData();
  }

  FirestoreData() {
    this.crypto$ = this.actRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.GetCryptoData();
        return this.firestore.doc('cryptos/' + id).valueChanges();
      })
    );
  }

  GetCryptoData() {
    const CRYPTO_ID = this.actRoute.snapshot.paramMap.get('id');
    if (CRYPTO_ID) {
      const CryptoProfile = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTO_ID}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%201y`;
      const CryptoChart = `https://api.coingecko.com/api/v3/coins/${CRYPTO_ID}/market_chart?vs_currency=usd&days=1`;
      const CryptoData = `https://api.blockchair.com/bitcoin-cash/stats`;

      this.cryptoProfiles = this.https.get(CryptoProfile);

      // Might use it someday
      // this.cryptoCharts = this.https.get<ChartData>(CryptoChart).subscribe(resChart => {
      //   this.cryptoCharts = resChart;
      //   for (let i = 0; i < 10; i++) {
      //     const chartPrices = resChart.prices[i][1];
      //     this.lineChartData = [
      //       { data: [chartPrices] },
      //     ];
      //   }
      // });
      this.https.get(CryptoChart).subscribe(res => {
        this.cryptoCharts = [res];
        // console.log(this.cryptoPrices[0].sparkline_in_7d.price)
      });

      this.https.get<RootObject>(CryptoProfile).subscribe(res => {
        this.cryptoPrices = res;
      })

      this.https.get<BlockchainData>(CryptoData).subscribe(res => {
        this.cryptoDatas = res;
      });

      // GET REUSLT THEN 'data.mcap = tolocalsting()' for formatting
      // ALSO REFORMAT DAILY PRICE TO AN ARRAY, TO INSERT IN CHART
      document.getElementById("loading").style.display = "none";
      document.getElementById("main").style.display = "block";
    } else {
      this.router.navigate(['/']);
      window.alert('An error occurred!');
    }
  }
}
