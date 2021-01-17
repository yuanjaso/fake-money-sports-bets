import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [CommonModule, GamesRoutingModule],
})
export class GamesModule {}
