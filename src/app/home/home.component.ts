import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/shared.types';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService
      .getAccounts()
      .subscribe((accounts) => (this.accounts = accounts));
  }
}
