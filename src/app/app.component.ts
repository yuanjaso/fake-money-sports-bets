import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MockStoreService } from './mock-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSidenav = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: MockStoreService
  ) {}

  signOut(): void {
    this.authService.signOut().subscribe(() => {
      this.store.account$.next(undefined);
      this.router.navigateByUrl('/auth/signin');
    });
  }
}
