import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../..';
import { GamesService } from '../games.service';
import { Game } from '../games.types';
import { setLeague } from '../store/games.actions';
import { selectGamesScoreboard } from '../store/games.selectors';

@Component({
  selector: 'app-games-board',
  templateUrl: './games-board.component.html',
  styleUrls: ['./games-board.component.scss'],
})
export class GamesBoardComponent implements OnInit, OnDestroy {
  games: Game[] | undefined;
  selectedGame: Game | undefined;

  private subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(selectGamesScoreboard)
        .subscribe((games) => (this.games = games))
    );

    const leagueChanged$ = this.activatedRoute.params.pipe(
      map((params) => params.league),
      tap((league) => {
        this.store.dispatch(setLeague({ league }));
      })
    );
    this.subscription.add(leagueChanged$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectGame(game: Game): void {
    this.selectedGame = game;
    this.gamesService.selectedGame$.next(game);
  }
}
