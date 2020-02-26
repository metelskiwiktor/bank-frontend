import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransactionTransfer} from '../model/request/TransactionTransfer';
import {TransactionTransferResponse} from '../model/response/TransactionTransferResponse';
import {Login} from '../model/request/Login';
import {Observable} from 'rxjs';
import {AccountStorage} from './account-storage';
import {Details} from '../model/Details';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {


  constructor(private httpClient: HttpClient, private accountStorage: AccountStorage) {
  }

  public createTransaction(transaction: TransactionTransfer) {
    const tokenValue = this.accountStorage.getTokenValue();
    this.httpClient.post('http://localhost:8090/transfer', transaction, {headers: {tokenValue}});
  }

  public getTransactions() {
    const tokenValue = this.accountStorage.getTokenValue();
    return this.httpClient.get<TransactionTransferResponse[]>('http://localhost:8090/account/transactions-history', {headers: {tokenValue}});
  }

  public login(login: Login) {
    this.httpClient.post('http://localhost:8090/oauth/login', login, {responseType: 'text'}).subscribe(value => {
        this.accountStorage.setTokenValue(value);
      }
    );
  }

  public logout() {
    const tokenValue = this.accountStorage.getTokenValue();
    this.httpClient.get('http://localhost:8090/oauth/logout', {headers: {tokenValue}});
  }

  public getBranchByAccountNumber(accountNumber: string): string {
    let branch;
    this.httpClient.get<string>('http://localhost:8090/bank-administration/' + accountNumber + '/branch').subscribe(value => branch = value);
    return branch;
  }

  public getAccountDetails(): Observable<Details> {
    const tokenValue = this.accountStorage.getTokenValue();
    return this.httpClient.get<Details>('http://localhost:8090/account/details', {headers: {tokenValue}});
  }
}
