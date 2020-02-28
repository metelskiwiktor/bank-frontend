import {Component, OnInit} from '@angular/core';
import {TransactionTransferSelf} from '../model/request/TransactionTransferSelf';
import {HttpClientService} from '../service/http-client.service';
import {AccountStorage} from '../service/account-storage';
import {Client} from '../model/Client';

@Component({
  selector: 'app-transferself',
  templateUrl: './transferself.component.html',
  styleUrls: ['./transferself.component.css']
})
export class TransferselfComponent implements OnInit {
  transferSelf: TransactionTransferSelf = new TransactionTransferSelf();
  operationChoice: string;

  constructor(private httpClientService: HttpClientService, private accountStorage: AccountStorage) {
  }

  ngOnInit(): void {
    this.httpClientService.getAccountDetails();
    this.transferSelf.senderAccountNumber = this.accountStorage.getAccountNumber();
    this.transferSelf.senderBalance = this.accountStorage.getBalance();
    this.transferSelf.client = Client.WEB;
  }

  createTransaction() {
    this.httpClientService.createTransactionSelf(this.transferSelf, this.operationChoice);
  }

}
