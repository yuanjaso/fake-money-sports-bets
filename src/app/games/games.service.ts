import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { Game } from './games.types';

@Injectable()
export class GamesService {
  selectedGame$ = new Subject<Game>();

  constructor(private httpClient: HttpClientWrapper) {}

  getScoreboard(league: string, date: Date): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`/games/${league}/`, {
      date: date.toISOString().slice(0, 10),
    });
  }
}
