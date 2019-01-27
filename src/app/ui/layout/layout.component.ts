import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  appState: Observable<{ selected: boolean }>;

  constructor(public auth0Service: AuthService,
              public store: Store<AppState>) {
  }

  ngOnInit() {
    this.appState = this.store.select('profile');
  }

}
