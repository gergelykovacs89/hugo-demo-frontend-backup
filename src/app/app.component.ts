import { Component } from '@angular/core';
import {AuthService} from './auth0/auth.service';

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
