import { createFeatureSelector } from '@ngrx/store';
import { gamesFeatureKey, GamesState } from './games/store/games.reducer';
import {
  historyFeatureKey,
  HistoryState,
} from './history/store/history.reducer';

export interface AppState {
  history: HistoryState;
  games: GamesState;
}

export const selectHistory = createFeatureSelector<AppState, HistoryState>(
  historyFeatureKey
);

export const selectGames = createFeatureSelector<AppState, GamesState>(
  gamesFeatureKey
);
