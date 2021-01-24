import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { GameBetsComponent } from './game-bets/game-bets.component';
import { GamesBoardComponent } from './games-board/games-board.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';

@NgModule({
  declarations: [GamesComponent, GamesBoardComponent, GameBetsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GamesRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
  ],
  providers: [GamesService],
})
export class GamesModule {}
