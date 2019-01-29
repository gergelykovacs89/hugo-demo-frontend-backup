import {Component, OnInit} from '@angular/core';
import {AuthorModel} from '../../shared/models/author.model';
import {ProfileService} from '../profile.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  username: string;
  author: AuthorModel;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private auth0Service: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
          this.profileService.getAuthorByName(this.username).subscribe(
            author => {
              this.author = author;
            }
          );
        }
      );
  }

  canFollow() {

  }

  isSelf() {

  }

  Follow() {

  }

  Unfollow() {

  }
}
