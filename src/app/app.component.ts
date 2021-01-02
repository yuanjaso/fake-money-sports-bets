import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { MockStoreService } from './mock-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showSidenav = true;
  isAuthenticated = false;
  username: string | undefined;
  balance: number | undefined;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: MockStoreService
  ) {}

  ngOnInit(): void {
    const isAuthenticated$ = this.store.account$.pipe(
      tap((account) => {
        this.isAuthenticated = account !== undefined;
        this.username = account?.username;
        this.balance = account?.balance;
      })
    );
    this.subscription.add(isAuthenticated$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signOut(): void {
    this.authService.signOut().subscribe(() => {
      this.store.account$.next(undefined);
      this.router.navigateByUrl('/auth/signin');
    });
  }
}
