import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TransferComponent } from './transfer/transfer.component';
import { AccountComponent } from './account/account.component';
import {AppRoutingModule} from './app-routing.module';
import { OauthComponent } from './oauth/oauth.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    AccountComponent,
    OauthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
