import { createSelector } from '@ngrx/store';
import { selectHistory } from '../..';
import { HistoryState } from './history.reducer';

export const selectHistoryData = createSelector(
  selectHistory,
  (state: HistoryState) => state.data
);
