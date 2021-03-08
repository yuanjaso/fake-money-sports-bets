import { createAction, props } from '@ngrx/store';
import { Game } from '../games.types';

export const setLeague = createAction(
  '[Games] Set League',
  props<{ league: string }>()
);
export const setDate = createAction(
  '[Games] Set Date',
  props<{ date: Date }>()
);

export const getScoreboard = createAction(
  '[Games] Get Scoreboard',
  props<{ league: string; date: Date }>()
);
export const setScoreboard = createAction(
  '[Games] Set Scoreboard',
  props<{ scoreboard: Game[] }>()
);
