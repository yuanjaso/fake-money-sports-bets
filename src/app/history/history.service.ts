import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HistoryData } from './history.types';

@Injectable()
export class HistoryService {
  getData(league: string): Observable<HistoryData> {
    return of({
      league: 'nba',
      data: [
        { date: '2021-03-01', value: 235 },
        { date: '2021-03-05', value: 455 },
      ],
    });
  }
}
