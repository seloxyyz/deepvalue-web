import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Stocks } from '../services/stocks'

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss']
})
export class StockPageComponent implements OnInit {
  stocks: Observable<any[]>;
  stock$;
  stonks: any;
  stonksBalanceSheet: any;
  stonksQuotes: any;
  stonksSEC: any;
  stonksIncome: any;

  constructor(private actRoute: ActivatedRoute,
    private firestore: AngularFirestore, private https: HttpClient) {
    this.stocks = firestore.collection('stocks').valueChanges();
  }

  ngOnInit(): void {
    this.FirestoreData();
    this.GetStockData();
  }

  FirestoreData() {
    this.stock$ = this.actRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return this.firestore.doc('stocks/' + id).valueChanges();
      })
    );
  }

  GetStockData() {
    setTimeout(() => {
      const ticker = document.getElementById('ticker').innerHTML;

      if (ticker) {
        const StonkProfile = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${environment.fmp.apiKey}`;
        const StonkBalanceSheet = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${ticker}?limit=12&apikey=${environment.fmp.apiKey}`;
        const StonkQuote = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${environment.fmp.apiKey}`;
        const StonkIncome = `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?limit=120&apikey=${environment.fmp.apiKey}`

        // check ob output auch undefiend ist, wenn ja fick dich
        this.stonks = this.https.get(StonkProfile);
        this.stonksBalanceSheet = this.https.get(StonkBalanceSheet);
        this.stonksQuotes = this.https.get(StonkQuote);
        this.stonksIncome = this.https.get<Stocks>(StonkIncome).subscribe(resIncome => {
          this.stonksIncome = resIncome;
        });

        document.getElementById("loading").style.display = "none";
        document.getElementById("main").style.display = "block";
      }

    }, 1500);
  }

  DownloadSECFinancials() {
    const ticker = document.getElementById('ticker').innerHTML;

    if (ticker) {
      const StonkSEC = `https://financialmodelingprep.com/api/v3/financial-statements/${ticker}?datatype=zip&apikey=${environment.fmp.apiKey}`;

      this.stonksSEC = this.https.get(StonkSEC);

    }
  }

  // CHARTS 
  // EARNINGS
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Q3 2019', 'Q4 2019', 'Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020', 'Q1 2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Revenue' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Net Income' }
  ];
  // 

  // CASHFLOW


}
