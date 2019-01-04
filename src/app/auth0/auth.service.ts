import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {SetAuthors, SetUser} from '../profile/store/profile.actions';


const USER_ENDPOINT_REG = 'http://localhost:8080/profile/new';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  auth0 = new auth0.WebAuth({
    clientID: 'V5r3SyJMvcw2xjhLmAFOjMlwijrawaKv',
    domain: 'hugo-demo.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/profiles',
    scope: 'openid profile email'
  });

  constructor(public router: Router,
              private httpClient: HttpClient,
              private store: Store<AppState>) {
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
        this.setSession(authResult);
        this.router.navigate(['/profiles']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  getUserInfo(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.store.dispatch(new SetUser(profile['email']));
        this.httpClient.post(USER_ENDPOINT_REG, {email: profile['email'], fullName: profile['name']})
          .subscribe(
            res => {
              this.store.dispatch(new SetAuthors(res));
            },
            error => {
              console.log('Error occured - ' + error);
            }
          );
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('appState');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}
