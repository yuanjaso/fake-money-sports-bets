import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { setDate } from './store/games.actions';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  selectedLeague!: string;
  leagues = ['nfl', 'nba', 'nhl', 'mlb'];

  today = new Date();


  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    // ? grab the league from the URL, need to find a better way to do this
    this.selectedLeague = this.router.url.split('/')[2];
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.store.dispatch(setDate({ date: event.value as Date }));
  }
}
