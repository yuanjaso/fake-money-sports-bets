import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { SignUpForm, SignUpResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClientWrapper) {}

  signUp(signUpForm: SignUpForm): Observable<SignUpResponse> {
    return this.httpClient.post('/accounts/', signUpForm);
  }
}
