import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn(): void {
    this.showWrongCredentials = false;
    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
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
