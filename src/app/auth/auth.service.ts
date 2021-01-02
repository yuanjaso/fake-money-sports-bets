import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { SignInForm, SignUpForm, SignUpResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClientWrapper) {}

    return this.httpClient.post('/accounts/', signUpForm);
  signUp(signUpForm: SignUpForm): Observable<Account> {
  }

    return this.httpClient.post('/signin/', signInForm);
  signIn(signInForm: SignInForm): Observable<Account> {
  }
}
