import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesBoardComponent } from './games-board/games-board.component';
import { GamesComponent } from './games.component';

const routes: Routes = [
  {
    component: GamesComponent,
    path: '',
    children: [{ component: GamesBoardComponent, path: ':league' }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
