import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileLayoutComponent} from './profile-layout/profile-layout.component';
import {HomeModule} from '../home/home.module';
import {TabsModule} from 'ngx-bootstrap';
import {ProfileReducers} from './store/profile.reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProfileEffects} from './store/profile.effects';


@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    StoreModule.forFeature('profile', ProfileReducers),
    EffectsModule.forFeature([ProfileEffects]),
    TabsModule.forRoot()
  ],
  declarations: [ProfileLayoutComponent],
  exports: [HomeModule]
})
export class ProfileModule { }
