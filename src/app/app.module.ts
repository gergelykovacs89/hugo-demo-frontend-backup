import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UiModule} from './ui/ui.module';
import {FormsModule} from '@angular/forms';
import {BootstrapModule} from './shared/bootstrap/bootstrap.module';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HomeModule} from './home/home.module';
import {ProfileModule} from './profile/profile.module';
import {StoryModule} from './story/story.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CallbackProfileSelectComponent } from './home/callback-profile-select/callback-profile-select.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackProfileSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    HomeModule,
    ProfileModule,
    StoryModule,
    FormsModule,
    BootstrapModule,
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
