import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-games-board',
  templateUrl: './games-board.component.html',
  styleUrls: ['./games-board.component.scss'],
})
export class GamesBoardComponent implements OnInit {
  league$: Observable<string> | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.league$ = this.activatedRoute.params.pipe(
      map((params) => params.league)
    );
  }
}
