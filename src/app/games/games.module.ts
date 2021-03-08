import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GameBetsComponent } from './game-bets/game-bets.component';
import { GamesBoardComponent } from './games-board/games-board.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { GamesService } from './games.service';
import { GamesEffects } from './store/games.effects';
import { gamesFeatureKey, gamesReducer } from './store/games.reducer';

@NgModule({
  declarations: [GamesComponent, GamesBoardComponent, GameBetsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GamesRoutingModule,
    StoreModule.forFeature(gamesFeatureKey, gamesReducer),
    EffectsModule.forFeature([GamesEffects]),
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [GamesService],
})
export class GamesModule {}
