import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";

import { environment } from '../../src/environments/environment';

admin.initializeApp();

// TODO: move API calls for crypto and stocks here, call them in intervals,
// or if anyone access the page somehow

// Get Crypto data and write in firestore
export let getCryptoData = functions
    .pubsub
    .schedule('every 30 days')
    .onRun(async (context) => {

        let ATH;
        let EXPLORER;
        let ID;
        let NAME;
        let SUPPLY;
        let TICKER;
        let TRANSACTION_FEE_AVG_24H
        let TRANSACTIONS_24H;
        let VOLUME_24H;
        let WEBSITES;


        const CRYPTOS = {
            bitcoin: 'bitcoin',
            bitcoinCash: 'bitcoin-cash',
            cardano: 'cardano',
            dogecoin: 'dogecoin',
            ethereum: 'ethereum',
            solana: 'solana',
        }

        const CryptoProfile = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTOS}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%201y`;
        const CryptoData = `https://api.blockchair.com/${CRYPTOS}/stats`;

        let cryptoPrices;
        let cryptoData;


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

        await fetch(CryptoProfile);

        await fetch(CryptoProfile).then(res => {
            cryptoPrices = res;
        })

        await fetch(CryptoData).then(res => {
            cryptoData = res;
        });

        const CRYPTO_DATA = {
            ath: ATH,
            explorer: EXPLORER,
            id: ID,
            name: NAME,
            supply: SUPPLY,
            ticker: TICKER,
            transactionFeeAvg24h: TRANSACTION_FEE_AVG_24H,
            transactions24h: TRANSACTIONS_24H,
            volume24h: VOLUME_24H,
            websites: WEBSITES,
        }

        // write data from api to firestore
        return firestore().collection("cryptos/").doc(`${ID}`).set(CRYPTO_DATA);
    });


// Get Stocks data from api to firestore 
export let getStockData = functions
    .pubsub
    .schedule('every 30 days')
    .onRun(async (context) => {

        const STOCKS = {
            apple: 'aapl',
            microsoft: 'msft',
            tesla: 'tsla',
        }

        const fmpKey = environment.fmp.apiKey

        const STOCKS_DATA = {
            explorer: '',
            id: '',
            name: '',
            ticker: '',
            websites: '',
        }

        // write data from api to firestore
        return firestore().collection("cryptos/").doc().set(STOCKS_DATA);
    });
