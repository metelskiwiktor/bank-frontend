import { Component } from '@angular/core';
import {AccountStorage} from './service/account-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public accountStorage: AccountStorage) {
  }
  title = 'bank';
}
