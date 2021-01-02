import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MockStoreService } from '../mock-store.service';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { Account } from '../shared/shared.types';
import { SignInForm, SignUpForm } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClientWrapper,
    private store: MockStoreService
  ) {}

  signUp(signUpForm: SignUpForm): Observable<Account> {
    return this.httpClient
      .post<Account>('/accounts/', signUpForm)
      .pipe(tap((account) => this.store.account$.next(account)));
  }

  signIn(signInForm: SignInForm): Observable<Account> {
    return this.httpClient
      .post<Account>('/signin/', signInForm)
      .pipe(tap((account) => this.store.account$.next(account)));
  }

  signOut(): Observable<null> {
    return this.httpClient.get('/signout/');
  }

  getAccount(): Observable<Account> {
    return this.httpClient
      .get<Account>('/account/')
      .pipe(tap((account) => this.store.account$.next(account)));
  }
}
