import { Action, createReducer, on } from '@ngrx/store';
import { Game } from '../games.types';
import { setDate, setLeague, setScoreboard } from './games.actions';

export interface GamesState {
  league: string | undefined;
  date: Date;
  scoreboard: Game[] | undefined;
}

const initialState: GamesState = {
  league: undefined,
  date: new Date(),
  scoreboard: undefined,
};

const reducer = createReducer(
  initialState,
  on(setDate, (state, { date }) => ({ ...state, date })),
  on(setLeague, (state, { league }) => ({ ...state, league })),
  on(setScoreboard, (state, { scoreboard }) => ({ ...state, scoreboard }))
);

export function gamesReducer(
  state: GamesState | undefined,
  action: Action
): GamesState {
  return reducer(state, action);
}

export const gamesFeatureKey = 'games';
