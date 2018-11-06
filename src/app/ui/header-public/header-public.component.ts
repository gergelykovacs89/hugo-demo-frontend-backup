import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth0/auth.service';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.css']
})
export class HeaderPublicComponent implements OnInit {

  constructor(private auth0Service: AuthService) { }

  ngOnInit() {
    console.log('Not Public header init');
  }

  onLogin() {
    this.auth0Service.login();
  }

  onLogout() {
    this.auth0Service.logout();
  }
}
