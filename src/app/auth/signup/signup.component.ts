import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  showUsernameTaken = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signUp(): void {
    this.showUsernameTaken = false;
    this.authService.signUp(this.form.value).subscribe({
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.showUsernameTaken = true;
        } else {
          throw err;
        }
      },
      next: () => {
        this.router.navigateByUrl('/');
      },
    });
  }
}
