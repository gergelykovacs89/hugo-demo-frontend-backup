import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.css']
})
export class HeaderPublicComponent implements OnInit {
  public isCollapsed = true;

  constructor(private authService: AuthService,
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
