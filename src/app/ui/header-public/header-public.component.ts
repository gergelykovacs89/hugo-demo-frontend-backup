import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth0/auth.service';
import {Store} from '@ngrx/store';
import {AuthorModel} from '../../shared/models/author.model';
import {Logout} from '../../profile/store/profile.actions';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.css']
})
export class HeaderPublicComponent implements OnInit {
  public isCollapsed = true;

  constructor(private auth0Service: AuthService,
              private store: Store<{
                profile: {
                  selectedAuthor: AuthorModel
                }
              }>) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.auth0Service.login();
  }

  onLogout() {
    this.store.dispatch(new Logout());
    this.auth0Service.logout();
  }

  onRegister() {

  }
}
