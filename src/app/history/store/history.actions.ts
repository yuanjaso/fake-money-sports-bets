import { createAction, props } from '@ngrx/store';

export const setData = createAction(
  '[History] Set Data',
  props<{ data: { league: string; data: { date: string; value: number }[] } }>()
);
