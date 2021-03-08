import { createAction, props } from '@ngrx/store';

export const getData = createAction(
  '[History] Get Data',
  props<{ league: string }>()
);

export const setData = createAction(
  '[History] Set Data',
  props<{ data: { league: string; data: { date: string; value: number }[] } }>()
);
