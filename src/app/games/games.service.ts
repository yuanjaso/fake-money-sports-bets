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
          {
            home: 'Cleveland Cavaliers',
            away: 'Washington Wizards',
          },
          {
            home: 'Minnesota Timberwolves',
            away: 'Atlanta Hawks',
          },
          {
            home: 'San Antonio Spurs',
            away: 'Portland Trailblazers',
          },
          {
            home: 'Phoenix Suns',
            away: 'Memphis Grizzlies',
          },
          {
            home: 'Milwaukee Bucks',
            away: 'Brooklyn Nets',
          },

          {
            home: 'Detroit Pistons',
            away: 'Miami Heat',
          },
          {
            home: 'Houston Rockets',
            away: 'Chicago Bulls',
          },
          {
            home: 'Golden State Warriors',
            away: 'Los Angeles Lakers',
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
