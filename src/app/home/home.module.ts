import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import { StoriesGridComponent } from './stories-grid/stories-grid.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [RecommendationsComponent, StoriesGridComponent],
  exports: [RecommendationsComponent, StoriesGridComponent]
})
export class HomeModule { }
