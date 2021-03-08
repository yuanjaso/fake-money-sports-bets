import { createSelector } from '@ngrx/store';
import { selectGames } from '../..';
import { GamesState } from './games.reducer';

export const selectGamesScoreboard = createSelector(
  selectGames,
  (state: GamesState) => state.scoreboard
);

export const selectGamesLeagueAndDate = createSelector(
  selectGames,
  (state: GamesState) => ({
    league: state.league,
    date: state.date,
  })
);
