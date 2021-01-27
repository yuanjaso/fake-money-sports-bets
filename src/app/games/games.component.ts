import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  activeRoute: string | undefined;
  leagues = ['nfl', 'nba', 'nhl', 'mlb'];

  constructor() {}

  ngOnInit(): void {}
}
