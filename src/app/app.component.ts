import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private auth0Service: AuthService) {
    this.auth0Service.handleAuthentication();
  }
}
