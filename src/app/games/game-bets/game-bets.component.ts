import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { GamesService } from '../games.service';
import { Game } from '../games.types';

@Component({
  selector: 'app-game-bets',
  templateUrl: './game-bets.component.html',
  styleUrls: ['./game-bets.component.scss'],
})
export class GameBetsComponent implements OnInit {
  game: Game | undefined;

  moneyline = new FormGroup({
    team: new FormControl(null, [Validators.required]),
    betAmount: new FormControl(),
  });
  moneylinePayout = 0;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.selectedGame$.subscribe((game) => {
      this.game = game;
      this.moneyline.reset();
      this.moneylinePayout = 0;
    });

    this.moneyline.valueChanges
      .pipe(
        filter((form) => form.team && form.betAmount),
        tap((form) => {
          const game = this.game as Game;
          // check which team the user selected
          if (form.team === game.home) {
            this.moneylinePayout = this.calculatePayout(
              form.betAmount,
              game.home.moneyLine
            );
          } else {
            this.moneylinePayout = this.calculatePayout(
              form.betAmount,
              game.away.moneyLine
            );
          }
        })
      )
      .subscribe();
  }

  placeMoneylineBet(): void {
    console.log('form submitted', this.moneyline.value);
  }

  private calculatePayout(betAmount: number, odds: number): number {
    if (odds < 0) {
      // favourite
      return (100 / -odds) * betAmount;
    } else if (odds > 0) {
      // underdog
      return (odds / 100) * betAmount;
    } else {
      // zero case not sure what to do
      return betAmount;
    }
  }
}
