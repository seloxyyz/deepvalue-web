import { Component, ViewChild } from '@angular/core';

import { AuthService } from './user/auth.service';
import { StocksService } from './services/stocks.service';

import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Deepvalue';

  constructor(public authService: AuthService, public stocksService: StocksService) { }

  @ViewChild('sidenav') sidenav: MatSidenav;


  close() {
    this.sidenav.close();
  }


}
