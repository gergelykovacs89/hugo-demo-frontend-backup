import {Component, OnInit} from '@angular/core';
import {AuthorModel} from '../../shared/models/author.model';
import {ProfileService} from '../profile.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit {
  username: string;
  author: AuthorModel;
  selectedAuthor: AuthorModel;
  userAuthors: AuthorModel[];

  constructor(private authorService: ProfileService,
              private route: ActivatedRoute,
              private auth0Service: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
          this.authorService.getAuthorByName(this.username).subscribe(
            authorProfile => {
              this.setupAuthors(authorProfile);
            }
          );
        }
      );
  }

  Follow() {
    this.authorService.followAuthor(this.selectedAuthor._id, this.author._id)
      .subscribe((res) => {
        if (res['message'] === 'UPDATED') {
          this.followCallback();
        }
      });
  }

  Unfollow() {
    this.authorService.unfollowAuthor(this.selectedAuthor._id, this.author._id)
      .subscribe((res) => {
        if (res['message'] === 'UPDATED') {
          this.unFollowCallback();
        }
      });
  }

  isSelf(): boolean {
    return this.userAuthors.findIndex(userAuthor => userAuthor._id === this.author._id) !== -1;
  }

  canFollow(): boolean {
    return this.selectedAuthor === null ?
      false : this.selectedAuthor.following.findIndex(authorId =>
      authorId === this.author._id) === -1;
  }

  unFollowCallback() {
    const authorUnfollowIndex = this.selectedAuthor.following.findIndex(authorUnfollowId => authorUnfollowId === this.author._id);
    this.selectedAuthor.following.splice(authorUnfollowIndex, 1);
    const authorSelfIndex = this.author.followers.findIndex(authorSelfId => authorSelfId === this.selectedAuthor._id);
    this.author.followers.splice(authorSelfIndex, 1);
    this.auth0Service.selectedAuthor.next(this.selectedAuthor);
  }

  followCallback() {
    this.selectedAuthor.following.push(this.author._id);
    this.author.followers.push(this.selectedAuthor._id);
    this.auth0Service.selectedAuthor.next(this.selectedAuthor);
  }

  setupAuthors(authorProfile) {
    this.author = authorProfile;
    if (!authorProfile) {
      alert(`No author named ${this.username} found.`);
      this.router.navigate(['/']); // route to no such user
    }
    this.auth0Service.authors.subscribe(authors => {
      this.userAuthors = authors;
      this.auth0Service.selectedAuthor.subscribe(author => {
        this.selectedAuthor = author;
      });
    });
  }
}
