import {Component, OnInit} from '@angular/core';
import {AuthorModel} from '../../shared/models/author.model';
import {AuthService} from '../../auth0/auth.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Logout, StartSelectAuthor} from '../../profile/store/profile.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public authorState: Observable<{ selectedAuthor: AuthorModel }>;

  constructor(public auth0Service: AuthService,
              private router: Router,
              private store: Store<{
                profile: {
                  selectedAuthor: AuthorModel
                }
              }>) {
  }

  ngOnInit() {
    this.authorState = this.store.select('profile');
  }

  onLogin() {
    this.auth0Service.login();
  }

  onLogout() {
    this.store.dispatch(new Logout());
    this.auth0Service.logout();
  }

  onSelectAuthor() {
    this.store.dispatch(new StartSelectAuthor());
    this.router.navigate(['/profiles']);
  }
}
