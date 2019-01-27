import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const REG_API_ENDPOINT = 'http://localhost:3000/api/register';
const LOGOUT_API_ENDPOINT = 'http://localhost:3000/api/logout';

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

  removeUserToken(userToken: string) {
    const headers = new HttpHeaders()
      .append('x-auth', userToken);
    return this.httpClient.delete(LOGOUT_API_ENDPOINT, {headers: headers});
  }


}

