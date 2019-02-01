import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserService} from '../profile/user.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AuthorModel} from '../shared/models/author.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/login';
const GET_AUTHORS_API_ENDPOINT = 'http://localhost:3000/api/user-authors';
const GET_AUTHOR_BY_ID_API_ENDPOINT = 'http://localhost:3000/api/get-author-by-id';
const GET_AUTHOR_BY_TOKEN_API_ENDPOINT = 'http://localhost:3000/api/get-author-by-token';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authors = new BehaviorSubject<AuthorModel[]>([]);
  selectedAuthor = new BehaviorSubject<AuthorModel>(null);

  constructor(public router: Router,
              private httpClient: HttpClient,
              private userService: UserService) {
  }

  loginUser(credentials) {
    return this.httpClient.post(LOGIN_API_ENDPOINT, {
      email: credentials.email,
      password: credentials.password
    })
      .pipe(map(res => {
        if (res) {
          localStorage.setItem('currentUser', JSON.stringify(res['user'], ['email', '_id']));
          localStorage.setItem('userToken', JSON.stringify(res['user']['userToken']));
          this.authors.next(res['authors']);
        }
        return res;
      }));
  }

  loginAuthor(authorId: string) {
    this.signIngAuthor(authorId)
      .subscribe((author: AuthorModel) => {
        this.selectedAuthor.next(author);
      });
  }

  signIngAuthor(authorId: string): Observable<AuthorModel> {
    const headers = new HttpHeaders()
      .append('authName', authorId);
    return this.httpClient.get(GET_AUTHOR_BY_ID_API_ENDPOINT, {headers: headers})
      .pipe(map(res => {
        if (res) {
          localStorage.setItem('authorToken', JSON.stringify(res['authorToken']));
        }
        return res['author'];
      }));
  }

  switchAuthor(): Observable<any> {
    const authorToken = JSON.parse(localStorage.getItem('authorToken'));
    return this.userService.removeAuthorToken(authorToken)
      .pipe(map(res => {
        if (res['status'] === 'AUTHOR_LOGGED_OUT') {
          localStorage.removeItem('authorToken');
        }
        return res;
      }));
  }

  getAuthorsByUser(): Observable<any> {
    return this.httpClient.get<any>(GET_AUTHORS_API_ENDPOINT);
  }

  getSelectedAuthor(): AuthorModel {
    const authorToken = JSON.parse(localStorage.getItem('authorToken'));
    const authorId = helper.decodeToken(authorToken)._id;
    return this.authors.getValue().find(author => author._id === authorId);
  }

  public handleAuthentication(): void {
      if (this.isUserAuthenticated() && !this.isAuthorAuthenticated()) {
        this.getAuthorsByUser()
          .subscribe((authors) => {
            this.setAuthors(authors);
            this.router.navigate(['/profiles']);
          });
      } else if (this.isUserAuthenticated() && this.isAuthorAuthenticated()) {
        this.getAuthorsByUser()
          .subscribe((authors) => {
            this.setSelectedAuthor(authors);
          });
      } else {
        this.router.navigate(['/']);
      }
  }

  public logout() {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    let authorToken = JSON.parse(localStorage.getItem('authorToken'));
    if (!authorToken) {
      authorToken = '';
    }
    return this.userService.removeUserToken(userToken, authorToken)
      .pipe(map(res => {
        if (res['status'] === 'LOGGED_OUT') {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('userToken');
          localStorage.removeItem('authorToken');
        }
        return res;
      }));
  }

  public isUserAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return !!userToken;
  }

  public isAuthorAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const authorToken = JSON.parse(localStorage.getItem('authorToken'));
    return !!authorToken;
  }

  public getAuthors(): Observable<AuthorModel[]> {
    return this.authors.asObservable();
  }

  // private setSession(authResult): void {
  //   // Set the time that the Access Token will expire at
  //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);
  // }

  private setAuthors(authors: AuthorModel[]) {
    this.authors.next(authors);
  }

  setSelectedAuthor(authors: AuthorModel[]) {
    this.authors.next(authors);
    const selectedAuthor = this.getSelectedAuthor();
    this.selectedAuthor.next(selectedAuthor);
  }
}
