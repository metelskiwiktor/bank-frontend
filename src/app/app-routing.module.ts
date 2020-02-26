import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from './account/account.component';
import {OauthComponent} from './oauth/oauth.component';
import {TransferComponent} from './transfer/transfer.component';

const routes: Routes = [
  {path: 'transactions-history', component: AccountComponent},
  {path: 'login', component: OauthComponent},
  {path: 'transfer', component: TransferComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
