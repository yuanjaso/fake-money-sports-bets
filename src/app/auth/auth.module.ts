import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent, SigninComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
