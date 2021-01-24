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
            home: {
              name: 'Toronto Raptors',
              moneyLine: 125,
            },
            away: { name: 'Dallas Mavericks', moneyLine: -140 },
          },
          {
            home: { name: 'Orlando Magic', moneyLine: 100 },
            away: { name: 'New York Knicks', moneyLine: -45 },
          },
          {
            home: { name: 'Cleveland Cavaliers', moneyLine: -140 },
            away: { name: 'Washington Wizards', moneyLine: -140 },
          },
          {
            home: { name: 'Minnesota Timberwolves', moneyLine: -140 },
            away: { name: 'Atlanta Hawks', moneyLine: -140 },
          },
          {
            home: { name: 'San Antonio Spurs', moneyLine: -140 },
            away: { name: 'Portland Trailblazers', moneyLine: -140 },
          },
          {
            home: { name: 'Phoenix Suns', moneyLine: -140 },
            away: { name: 'Memphis Grizzlies', moneyLine: -140 },
          },
          {
            home: { name: 'Milwaukee Bucks', moneyLine: -140 },
            away: { name: 'Brooklyn Nets', moneyLine: -140 },
          },

          {
            home: { name: 'Detroit Pistons', moneyLine: -140 },
            away: { name: 'Miami Heat', moneyLine: -140 },
          },
          {
            home: { name: 'Houston Rockets', moneyLine: -140 },
            away: { name: 'Chicago Bulls', moneyLine: -140 },
          },
          {
            home: { name: 'Golden State Warriors', moneyLine: -140 },
            away: { name: 'Los Angeles Lakers', moneyLine: -140 },
          },
        ]);
      case 'nfl':
        return of([
          {
            home: { name: 'Buffalo Bills', moneyLine: -140 },
            away: { name: 'Kansas City Chiefs', moneyLine: -140 },
          },
          {
            home: { name: 'Tampa Bay Buccaneers', moneyLine: -140 },
            away: { name: 'Green Bay Packers', moneyLine: -140 },
          },
        ]);
      default:
        return of([]);
    }
  }
}
