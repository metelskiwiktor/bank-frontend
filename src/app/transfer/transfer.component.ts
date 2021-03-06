import {Component, NgZone, OnInit} from '@angular/core';
import {TransactionTransfer} from '../model/request/TransactionTransfer';
import {Details} from '../model/Details';
import {HttpClientService} from '../service/http-client.service';
import {AccountStorage} from '../service/account-storage';
import {Router} from '@angular/router';
import {split} from 'ts-node';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  transaction: TransactionTransfer = new TransactionTransfer();
  recipientBranch: string;

  constructor(private httpClientService: HttpClientService, private accountStorage: AccountStorage, private route: Router, private zone: NgZone) {
    this.httpClientService.getAccountDetails();
  }

  ngOnInit(): void {
  }

  createTransaction() {
    this.transaction.senderBalance = this.accountStorage.getBalance();
    this.transaction.senderAccountNumber = this.accountStorage.getAccountNumber();
    this.httpClientService.createTransaction(this.transaction);
    this.route.navigateByUrl('/transactions-history');
  }

  isRecipientAccountNumber(): boolean {
    return this.transaction.recipientAccountNumber != null;
  }

  getRecipientBranch(): string {
    return this.recipientBranch;
  }

  setRecipientBranch() {
    if (this.isRecipientAccountNumber()) {
      this.httpClientService.getBranchByAccountNumber(this.transaction.recipientAccountNumber).subscribe(value => {
        this.recipientBranch = value;
      });
    }
  }
}
