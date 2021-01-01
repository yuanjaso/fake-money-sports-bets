import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { SignUpForm } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClientWrapper) {}

  signUp(signUpForm: SignUpForm): Observable<unknown> {
    return this.httpClient.post('/accounts/', signUpForm);
  }
}
