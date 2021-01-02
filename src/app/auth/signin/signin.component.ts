import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MockStoreService } from '../../mock-store.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  showWrongCredentials = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: MockStoreService
  ) {}

  ngOnInit(): void {}

  signIn(): void {
    this.showWrongCredentials = false;
    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        // if user got taken to signin page after going to a protected page,
        // take them to their original page otherwise go to home page
        const url = this.store.redirectURL ?? '/home';
        this.router.navigateByUrl(url);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.showWrongCredentials = true;
        } else {
          throw err;
        }
      },
    });
  }
}
