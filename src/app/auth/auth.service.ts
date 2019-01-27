import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {map} from 'rxjs/operators';
import {UserService} from '../profile/user.service';


const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



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
        }
        return res;
      }));
  }

  public handleAuthentication(): void {
      if (this.isAuthenticated()) {
        this.router.navigate(['/profiles']);
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

}
