import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoPageComponent } from './crypto-page/crypto-page.component';
import { HomeComponent } from './home/home.component';
import { PrivacypolicyComponent } from './legal/privacypolicy/privacypolicy.component';
import { TermsofserviceComponent } from './legal/termsofservice/termsofservice.component';
import { PressComponent } from './press/press.component';
import { ProComponent } from './pro/pro.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestComponent } from './request/request.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockPageComponent } from './stock-page/stock-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'cryptos', component: CryptoListComponent },
  { path: 'crypto/:id', component: CryptoPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'press', component: PressComponent },
  { path: 'pro', component: ProComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'request', component: RequestComponent },
  { path: 'roadmap', component: RoadmapComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'stock/:id', component: StockPageComponent },

  // Legal
  { path: 'terms-of-service', component: TermsofserviceComponent },
  { path: 'privacy-policy', component: PrivacypolicyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
