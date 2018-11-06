import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth0/auth.service';
import {AuthorModel} from '../../shared/models/author.model';
import {ProfileService} from '../../profile/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-callback-profile-select',
  templateUrl: './callback-profile-select.component.html',
  styleUrls: ['./callback-profile-select.component.css']
})
export class CallbackProfileSelectComponent implements OnInit {
  private myAuthors: AuthorModel[];


  constructor(private auth0Service: AuthService,
              private profileService: ProfileService,
              private router: Router) { }

  ngOnInit() {
    this.myAuthors = this.profileService.getUserAuthors();
    this.auth0Service.isAuthenticated();
  }

  onSelectProfile(authorId: number) {
    this.profileService.selectedAuthor = this.profileService.getUserAuthor(authorId);
    this.profileService.selectedAuthorSub.next(this.profileService.selectedAuthor);
    console.log(this.profileService.isProfileSelected());
    console.log(this.profileService.selectedAuthor);
    this.router.navigate(
      ['/profile/', authorId]
    );
  }
}
