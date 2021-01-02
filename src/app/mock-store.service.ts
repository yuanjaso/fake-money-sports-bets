import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from './shared/shared.types';

// ! temporary store until ngrx version 11 comes out
@Injectable({ providedIn: 'root' })
export class MockStoreService {
  account$ = new BehaviorSubject<Account | undefined>(undefined);
  redirectURL: string | undefined;
}
