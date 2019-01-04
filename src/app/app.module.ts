import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UiModule} from './ui/ui.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BootstrapModule} from './shared/bootstrap/bootstrap.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HomeModule} from './home/home.module';
import {ProfileModule} from './profile/profile.module';
import {StoryModule} from './story/story.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {CallbackProfileSelectComponent} from './home/callback-profile-select/callback-profile-select.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {reducers} from './store/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['profile'], rehydrate: true})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];


@NgModule({
  declarations: [
    AppComponent,
    CallbackProfileSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AppRoutingModule,
    UiModule,
    HomeModule,
    ProfileModule,
    StoryModule,
    FormsModule,
    BootstrapModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {metaReducers}),
    environment ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
