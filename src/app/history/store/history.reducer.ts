import { Action, createReducer, on, State } from '@ngrx/store';

import { setData } from './history.actions';

export interface HistoryState {
  data: { league: string; data: { date: string; value: number }[] };
}

const initialState: HistoryState = {
  data: { league: 'nba', data: [] },
};

const reducer = createReducer(
  initialState,
  on(setData, (state, { data }) => ({ ...state, data }))
);

export function historyReducer(
  state: HistoryState | undefined,
  action: Action
) {
  return reducer(state, action);
}

export const historyFeatureKey = 'history';
