import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { Game } from './games.types';

@Injectable()
export class GamesService {
  constructor(private httpClient: HttpClientWrapper) {}

  getGames(league: string): Observable<Game[]> {
    switch (league) {
      case 'nba':
        return of([
          {
            home: 'Toronto Raptors',
            away: 'Dallas Mavericks',
          },
          {
            home: 'Orlando Magic',
            away: 'New York Knicks',
          },
        ]);
      case 'nfl':
        return of([
          {
            home: 'Buffalo Bills',
            away: 'Kansas City Chiefs',
          },
          {
            home: 'Tampa Bay Buccaneers',
            away: 'Green Bay Packers',
          },
        ]);
      default:
        return of([]);
    }
  }
}
