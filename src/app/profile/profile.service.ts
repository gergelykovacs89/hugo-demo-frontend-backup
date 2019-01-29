import {Injectable, OnInit} from '@angular/core';
import {AuthorModel} from '../shared/models/author.model';
import {UserService} from './user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {parse, stringify} from 'flatted/esm';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

const ADD_AUTHOR_API_ENDPOINT = 'http://localhost:3000/api/new-author';
const UPDATE_AUTHOR_API_ENDPOINT = 'http://localhost:3000/api/update-author';
const DELETE_AUTHOR_API_ENDPOINT = 'http://localhost:3000/api/delete-author';
const GET_AUTHOR_BY_NAME_API_ENDPOINT = 'http://localhost:3000/api/get-author-by-name';



@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {
  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private authService: AuthService) {
  }

  public userAuthors: AuthorModel[];
  selectedAuthor: AuthorModel;

  ngOnInit() {
    this.authService.getAuthors().subscribe((authors) => {
      this.userAuthors = authors;
    });
    this.authService.selectedAuthor.subscribe(author => this.selectedAuthor = author);
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

  updateAuthor(author: AuthorModel) {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const headers = new HttpHeaders()
      .append('x-auth', userToken);
    return this.httpClient.put(UPDATE_AUTHOR_API_ENDPOINT, {
        _id: author._id,
        name: author.name,
        description: author.description,
        imgPath: author.imgPath
      },
      {headers: headers});
  }

  deleteAuthor(authorName: string) {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const headers = new HttpHeaders()
      .append('x-auth', userToken)
      .append('authName', authorName);
    return this.httpClient.delete(DELETE_AUTHOR_API_ENDPOINT, {headers: headers});
  }

  getAuthorByName(authorName: string): Observable<AuthorModel> {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const headers = new HttpHeaders()
      .append('x-auth', userToken)
      .append('authName', authorName);
    return this.httpClient.get<AuthorModel>(GET_AUTHOR_BY_NAME_API_ENDPOINT, {headers: headers});
}


  addFollower(follower: AuthorModel, following: AuthorModel) {

  }

  removeFollower(follower: AuthorModel, following: AuthorModel) {

  }
}
