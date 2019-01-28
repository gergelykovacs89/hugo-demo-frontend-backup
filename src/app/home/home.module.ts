import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import { StoriesGridComponent } from './stories-grid/stories-grid.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthorManagerComponent } from './callback-profile-select/author-manager/author-manager.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecommendationsComponent, StoriesGridComponent, RegisterComponent, LoginComponent, AuthorManagerComponent],
  exports: [RecommendationsComponent, StoriesGridComponent, RegisterComponent, LoginComponent]
})
export class HomeModule { }
