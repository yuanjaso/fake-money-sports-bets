import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';
import { HistoryEffects } from './store/history.effects';
import { historyFeatureKey, historyReducer } from './store/history.reducer';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    StoreModule.forFeature(historyFeatureKey, historyReducer),
    EffectsModule.forFeature([HistoryEffects]),
  ],
  providers: [HistoryService],
})
export class HistoryModule {}
