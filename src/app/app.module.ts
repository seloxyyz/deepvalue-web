import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

// UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';


import { ChartsModule } from 'ng2-charts';

// Services
import { AuthService } from './user/auth.service';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProComponent } from './pro/pro.component';
import { StockPageComponent } from './stock-page/stock-page.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { TermsofserviceComponent } from './legal/termsofservice/termsofservice.component';
import { PrivacypolicyComponent } from './legal/privacypolicy/privacypolicy.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PressComponent } from './press/press.component';
import { ContactComponent } from './contact/contact.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoPageComponent } from './crypto-page/crypto-page.component';
import { RequestComponent } from './request/request.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProComponent,
    StockPageComponent,
    StockListComponent,
    TermsofserviceComponent,
    PrivacypolicyComponent,
    CalendarComponent,
    PressComponent,
    ContactComponent,
    CryptoListComponent,
    CryptoPageComponent,
    RequestComponent,
    RoadmapComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // UI
    // Material
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    //
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
