import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { Account } from '../shared/shared.types';

@Injectable()
export class HomeService {
  constructor(private httpClient: HttpClientWrapper) {}

  getAccounts(): Observable<Account[]> {
    return this.httpClient.get('/accounts');
  }
}
