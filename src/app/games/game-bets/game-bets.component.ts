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

  form = new FormGroup({
    moneylineTeam: new FormControl(null, [Validators.required]),
    moneylineGamble: new FormControl(),
  });

  moneylinePayout = 0;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.selectedGame$.subscribe((game) => {
      this.game = game;
      this.form.reset();
      this.moneylinePayout = 0;
    });

    this.form.valueChanges
      .pipe(
        filter((form) => form.moneylineTeam && form.moneylineGamble),
        tap((form) => {
          // check which team the user selected
          if (form.moneylineTeam === this.game?.home.name) {
            this.moneylinePayout = this.calculatePayout(
              form.moneylineGamble,
              (this.game as Game).home.moneyLine
            );
          } else {
            this.moneylinePayout = this.calculatePayout(
              form.moneylineGamble,
              (this.game as Game).away.moneyLine
            );
          }
        })
      )
      .subscribe();
  }

  submit(): void {
    console.log('form submitted', this.form.value);
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
