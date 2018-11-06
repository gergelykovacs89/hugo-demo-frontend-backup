import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCubeComponent } from './profile-layout/profile-cube/profile-cube.component';
import { ProfileControlPanelComponent } from './profile-layout/profile-control-panel/profile-control-panel.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import {HomeModule} from '../home/home.module';
import {TabsModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    TabsModule.forRoot()
  ],
  declarations: [ProfileCubeComponent, ProfileControlPanelComponent, ProfileLayoutComponent],
  exports: [HomeModule]
})
export class ProfileModule { }
