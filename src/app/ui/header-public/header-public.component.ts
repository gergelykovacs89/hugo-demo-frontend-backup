import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AuthorModel} from '../../shared/models/author.model';
import {Logout} from '../../profile/store/profile.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.css']
})
export class HeaderPublicComponent implements OnInit {
  public isCollapsed = true;

  constructor(private authService: AuthService,
              private store: Store<{
                profile: {
                  selectedAuthor: AuthorModel
                }
              }>,
              private router: Router) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout()
      .subscribe((res) => {
        alert(res['status']);
        this.router.navigate(['/']);
      });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
