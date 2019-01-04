import {Component, OnInit} from '@angular/core';
import {AuthorModel} from '../../shared/models/author.model';
import {ProfileService} from '../profile.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {AuthService} from '../../auth0/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  public selectedAuthorState: Observable<{
    authors: AuthorModel[],
    selectedAuthor: AuthorModel
  }>;
  username: string;
  author: AuthorModel;
  selectedAuthor: AuthorModel;
  userAuthors: string[] = [];

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private auth0Service: AuthService) {
  }

  ngOnInit() {
    if (this.auth0Service.isAuthenticated()) {
      this.selectedAuthorState = this.store.select('profile');
      this.selectedAuthorState.subscribe((state) => {
        this.selectedAuthor = state.selectedAuthor;
        state.authors.forEach(
          author => {
            this.userAuthors.push(author.name);
          }
        );
      });
    }
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

  canFollow(): boolean {
    return this.author.followers.findIndex(author => author.name === this.selectedAuthor.name) !== -1;
  }

  isSelf() {
    return this.userAuthors.includes(this.author.name);
  }

  Follow() {
    this.profileService.addFollower(this.selectedAuthor, this.author);
  }

  Unfollow() {
    this.profileService.removeFollower(this.selectedAuthor, this.author);
  }
}
