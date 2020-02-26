import {Component, OnInit} from '@angular/core';
import {HttpClientService} from '../service/http-client.service';
import {TransactionTransferResponse} from '../model/response/TransactionTransferResponse';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  transactions: TransactionTransferResponse[];

  constructor(private httpClientService: HttpClientService) {
  }

  ngOnInit(): void {
    this.httpClientService.getTransactions().subscribe(
      value => this.transactions = value
    );
  }

}
