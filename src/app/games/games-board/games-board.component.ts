import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GamesService } from '../games.service';
import { Game } from '../games.types';

@Component({
  selector: 'app-games-board',
  templateUrl: './games-board.component.html',
  styleUrls: ['./games-board.component.scss'],
})
export class GamesBoardComponent implements OnInit, OnDestroy {
  league: string | undefined;
  games: Game[] = [];

  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    const leagueChanged$ = this.activatedRoute.params.pipe(
      map((params) => params.league),
      tap((league) => {
        this.league = league;

        // ? refactor when ngrx version 11 comes out
        this.gamesService
          .getGames(league)
          .pipe(tap((games) => (this.games = games)))
          .subscribe();
      })
    );
    this.subscription.add(leagueChanged$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
