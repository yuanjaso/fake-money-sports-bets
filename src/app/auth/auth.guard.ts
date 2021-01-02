import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, mapTo, switchMap } from 'rxjs/operators';
import { MockStoreService } from '../mock-store.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: MockStoreService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.account$.pipe(
      first(),
      switchMap((account) => {
        if (account === undefined) {
          // try to fetch an account
          return this.authService.getAccount().pipe(
            // we just need the request to succeed so if it works then return true
            mapTo(true),
            // if the request has an error (most likely 401 unauthenticated) then redirect to signin
            catchError(() => {
              this.store.redirectURL = state.url;
              return of(this.router.parseUrl('/auth/signin'));
            })
          );
        } else {
          // account exists so return true
          return of(true);
        }
      })
    );
  }
}
