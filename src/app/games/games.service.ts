import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClientWrapper } from '../shared/http-client-wrapper';
import { Game } from './games.types';

@Injectable()
export class GamesService {
  selectedGame$ = new Subject<Game>();

  constructor(private httpClient: HttpClientWrapper) {}

  getGames(league: string): Observable<Game[]> {
    return this.httpClient.get(`/games/${league}/`);
  }
}
