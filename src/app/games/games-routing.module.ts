import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesBoardComponent } from './games-board/games-board.component';
import { GamesComponent } from './games.component';

const routes: Routes = [
  {
    component: GamesComponent,
    path: '',
    children: [
      { component: GamesBoardComponent, path: 'nhl' },
      { component: GamesBoardComponent, path: 'nfl' },
      { component: GamesBoardComponent, path: 'nba' },
      { component: GamesBoardComponent, path: 'mlb' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
