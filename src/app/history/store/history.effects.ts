import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HistoryService } from '../history.service';
import { getData, setData } from './history.actions';

@Injectable()
export class HistoryEffects {
  getData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getData),
      switchMap(({ league }) => this.historyService.getData(league)),
      map((data) => setData({ data }))
    )
  );

  constructor(
    private actions$: Actions,
    private historyService: HistoryService
  ) {}
}
