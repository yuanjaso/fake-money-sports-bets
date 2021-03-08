import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { setData } from './store/history.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  @ViewChild('demoChart', { static: true })
  private demoChart!: ElementRef<HTMLCanvasElement>;
  private demoChartRef!: Chart;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      setData({
        data: {
          league: 'nba',
          data: [
            { date: '2021-03-01', value: 300 },
            { date: '2021-03-04', value: 544 },
          ],
        },
      })
    );

    Chart.pluginService.register({
      beforeDraw: (chart) => {
        // empty for now but could be useful later
      },
    });

    const canvas: HTMLCanvasElement = this.demoChart.nativeElement;
    const context: CanvasRenderingContext2D = canvas.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.demoChartRef = new Chart(context, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Monthly Balance',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [100000, 125000, 150000, 75750, 60000, 50000, 83450],
          },
        ],
      },

      // Configuration options go here
      options: {},
    });
  }

  ngOnDestroy(): void {
    this.demoChartRef.destroy();
  }
}
