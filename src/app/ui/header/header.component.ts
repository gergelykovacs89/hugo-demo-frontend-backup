import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../profile/profile.service';
import {AuthorModel} from '../../shared/models/author.model';
import {AuthService} from '../../auth0/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authorSubscription: Subscription;
  private author: AuthorModel;
  constructor(private profileService: ProfileService,
              private auth0Service: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authorSubscription = this.profileService.selectedAuthorSub.subscribe(
      (author: AuthorModel) => {
        this.author = author;
      }
    );
    this.author = this.profileService.selectedAuthor;
    console.log(this.author.name);
    console.log(this.profileService.isProfileSelected());
  }

  onLogin() {
    this.auth0Service.login();
  }

  onLogout() {
    this.auth0Service.logout();
  }

  onSelectAuthor() {
    this.profileService.selectedAuthor = null;
    this.profileService.selectedAuthorSub.next(null);
    this.router.navigate(['/profiles']);
  }
}
