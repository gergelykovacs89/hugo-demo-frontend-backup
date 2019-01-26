import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const REG_API_ENDPOINT = 'http://localhost:3000/api/register';
const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/login';
@Injectable({
  providedIn: 'root'
})

export class UserService {



  constructor(private httpClient: HttpClient) {
  }


  registerUser(userData) {
    return this.httpClient.post(REG_API_ENDPOINT, {
      email: userData.email,
      password: userData.password,
      fullName: userData.fullName
    });
  }

  loginUser(credentials) {
    return this.httpClient.post(LOGIN_API_ENDPOINT, {
      email: credentials.email,
      password: credentials.password
    });
  }
}

