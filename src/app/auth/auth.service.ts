import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { SignInForm, SignUpForm, SignUpResponse } from './auth.types';

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
  }
}
