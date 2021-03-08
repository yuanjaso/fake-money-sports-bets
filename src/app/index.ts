import { createFeatureSelector } from '@ngrx/store';
import {
  historyFeatureKey,
  HistoryState,
} from './history/store/history.reducer';

export interface AppState {
  history: HistoryState;
}

export const selectHistory = createFeatureSelector<AppState, HistoryState>(
  historyFeatureKey
);
