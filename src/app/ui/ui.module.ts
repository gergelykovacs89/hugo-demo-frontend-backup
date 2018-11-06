import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {BootstrapModule} from '../shared/bootstrap/bootstrap.module';
import {RouterModule} from '@angular/router';
import { HeaderPublicComponent } from './header-public/header-public.component';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    RouterModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, HeaderPublicComponent],
  exports: [
    LayoutComponent
  ]
})
export class UiModule { }
