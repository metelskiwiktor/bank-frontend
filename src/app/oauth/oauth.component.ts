import {Component, OnInit} from '@angular/core';
import {Login} from '../model/request/Login';
import {HttpClientService} from '../service/http-client.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {
  user: Login = new Login();

  constructor(private httpClientService: HttpClientService, public route: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.httpClientService.login(this.user);
    this.route.navigateByUrl('/transactions-history');
  }

}
