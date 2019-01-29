import {Component, OnInit} from '@angular/core';
import {AuthorModel} from '../../shared/models/author.model';
import {AuthService} from '../../auth/auth.service';
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
  selectedAuthor: AuthorModel;

  constructor(public auth0Service: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.auth0Service.selectedAuthor.subscribe(
      (author) => {
        this.selectedAuthor = author;
      }
    );
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.auth0Service.logout().subscribe((res) => {
      alert(res['status']);
      this.router.navigate(['/']);
    });
  }

  onSelectAuthor() {
    this.auth0Service.switchAuthor()
      .subscribe((res) => {
        if (res) {
          alert('author signed out');
          this.auth0Service.selectedAuthor.next(null);
          this.router.navigate(['/profiles']);
        }
      });
  }
}
