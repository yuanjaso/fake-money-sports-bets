import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment';
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

  // ! remove after real socket data is implemented
  POC_SOCKET_DATA: any | undefined;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: MockStoreService
  ) {}

  ngOnInit(): void {
    // BEGIN SOCKET IO
    const socket = io(environment.serverDomain);
    socket.on('connect', () => {
      console.log('connected to server socket io', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('disconnected to server socket io', socket.id);
    });

    // ! remove after real socket data is implemented
    socket.on('nba-data', (data: any[]) => {
      this.POC_SOCKET_DATA = data;
      console.log('data from nba-data event', data);
    });

    // END SOCKET IO

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
