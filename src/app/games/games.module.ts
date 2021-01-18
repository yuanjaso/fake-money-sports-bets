import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GamesBoardComponent } from './games-board/games-board.component';

@NgModule({
  declarations: [GamesComponent, GamesBoardComponent],
  imports: [CommonModule, GamesRoutingModule, MatTabsModule],
})
export class GamesModule {}
