import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransactionTransfer} from '../model/request/TransactionTransfer';
import {TransactionTransferResponse} from '../model/response/TransactionTransferResponse';
import {Login} from '../model/request/Login';
import {Observable} from 'rxjs';
import {AccountStorage} from './account-storage';
import {Details} from '../model/Details';
import {Client} from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private accountStorage: AccountStorage) {
  }

  public createTransaction(transaction: TransactionTransfer) {
    const tokenValue = this.accountStorage.getTokenValue();
    this.httpClient.post('http://localhost:8090/transaction/transfer', transaction, {headers: {tokenValue}}).subscribe(value => {
    });
  }

  public getTransactions() {
    const tokenValue = this.accountStorage.getTokenValue();
    return this.httpClient.get<TransactionTransferResponse[]>('http://localhost:8090/account/transactions-history', {headers: {tokenValue}});
  }

  public login(login: Login) {
    login.client = Client.WEB;
    return this.httpClient.post('http://localhost:8090/oauth/login', login, {responseType: 'text'});
  }

  public logout() {
    const tokenValue = this.accountStorage.getTokenValue();
    this.httpClient.get('http://localhost:8090/oauth/logout', {headers: {tokenValue}});
    this.accountStorage.logout();
  }

  public getBranchByAccountNumber(accountNumber: string) {
    return this.httpClient.get('http://localhost:8090/bank-administration/' + accountNumber + '/branch', {responseType: 'text'});
  }

  public getAccountDetails(): Observable<Details> {
    const tokenValue = this.accountStorage.getTokenValue();
    const http = this.httpClient.get<Details>('http://localhost:8090/account/details', {headers: {tokenValue}});
    http.subscribe(value => {
      this.accountStorage.setAccountDetails(value.balance, value.accountNumber);
    });
    return http;
  }
}
