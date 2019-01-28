import {Injectable, OnInit} from '@angular/core';
import {AuthorModel} from '../shared/models/author.model';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {parse, stringify} from 'flatted/esm';
import {AuthService} from '../auth/auth.service';

const ADD_AUTHOR_API_ENDPOINT = 'http://localhost:3000/api/new-author';


@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {
  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private authService: AuthService) {
  }

  public userAuthors: AuthorModel[];


  ngOnInit() {
    this.authService.getAuthors().subscribe((authors) => {
      this.userAuthors = authors;
    });
  }

  addAuthor(author: AuthorModel) {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const headers = new HttpHeaders()
      .append('x-auth', userToken);
    return this.httpClient.post(ADD_AUTHOR_API_ENDPOINT, {
      name: author.name,
      description: author.description,
      imgPath: author.imgPath
    },
      {headers: headers});
  }


  getAuthorByName(name: string): Observable<AuthorModel> {
    return this.httpClient.get<AuthorModel>('http://localhost:8080/author/' + name);
  }

  addFollower(follower: AuthorModel, following: AuthorModel) {

  }

  removeFollower(follower: AuthorModel, following: AuthorModel) {

  }


}
