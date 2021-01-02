import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
  providers: [HomeService]
})
export class HomeModule {}
