import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserService} from '../profile/user.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AuthorModel} from '../shared/models/author.model';
import {ProfileService} from '../profile/profile.service';


const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/login';
const GET_AUTHORS_API_ENDPOINT = 'http://localhost:3000/api/user-authors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authors = new BehaviorSubject<AuthorModel[]>([]);

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

  getAuthorsByUser(): Observable<any> {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const headers = new HttpHeaders()
      .append('x-auth', userToken);
    return this.httpClient.get<any>(GET_AUTHORS_API_ENDPOINT, {headers: headers});
  }

  public handleAuthentication(): void {
      if (this.isAuthenticated()) {
        this.getAuthorsByUser()
          .subscribe((authors) => {
            this.authors.next(authors);
            this.router.navigate(['/profiles']);
          });
      } else {
        this.router.navigate(['/']);
      }
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout() {
    console.log('clicked');
    // Remove tokens and expiry time from localStorage
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return this.userService.removeUserToken(userToken)
      .pipe(map(res => {
        if (res['status'] === 'LOGGED_OUT') {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('userToken');
        }
        return res;
      }));
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('id_token');
    // localStorage.removeItem('expires_at');
    // localStorage.removeItem('appState');
    // Go back to the home route
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    return !!userToken;
  }

  public getAuthors(): Observable<AuthorModel[]> {
    return this.authors.asObservable();
  }

}
