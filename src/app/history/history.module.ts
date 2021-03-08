import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { historyFeatureKey, historyReducer } from './store/history.reducer';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    StoreModule.forFeature(historyFeatureKey, historyReducer),
  ],
})
export class HistoryModule {}
