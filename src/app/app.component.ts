import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSidenav = true;

  constructor(private authService: AuthService, private router: Router) {}

  signOut(): void {
    this.authService.signOut().subscribe();
    this.router.navigateByUrl('/auth/signin');
  }
}
