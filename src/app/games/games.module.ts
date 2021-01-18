import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GamesBoardComponent } from './games-board/games-board.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';

@NgModule({
  declarations: [GamesComponent, GamesBoardComponent],
  imports: [CommonModule, GamesRoutingModule, MatTabsModule],
  providers: [GamesService],
})
export class GamesModule {}
