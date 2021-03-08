import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../..';
import { GamesService } from '../games.service';
import {
  getScoreboard,
  setDate,
  setLeague,
  setScoreboard,
} from './games.actions';
import { selectGamesLeagueAndDate } from './games.selectors';

@Injectable()
export class GamesEffects {
  setLeagueOrDate$ = createEffect(() =>
    this.actions.pipe(
      ofType(setLeague, setDate),
      withLatestFrom(this.store.select(selectGamesLeagueAndDate)),
      map(([, { league, date }]) =>
        getScoreboard({ league: league as string, date })
      )
    )
  );

  getScoreboard$ = createEffect(() =>
    this.actions.pipe(
      ofType(getScoreboard),
      switchMap(({ league, date }) =>
        this.gamesService.getScoreboard(league, date)
      ),
      map((scoreboard) => setScoreboard({ scoreboard }))
    )
  );

  constructor(
    private actions: Actions,
    private gamesService: GamesService,
    private store: Store<AppState>
  ) {}
}
