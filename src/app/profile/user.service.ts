import { Injectable } from '@angular/core';
import {UserModel} from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  private user: UserModel = new UserModel(1,
    'Gergely Kovács',
    'gergelyk89@gmail.com',
    'password');

  private user2: UserModel = new UserModel(2,
    'Döm Dödöm',
    'domdodom@gmail.com',
    'password');


  public getUser(): UserModel {
    return this.user;
  }

  public getUser2(): UserModel {
    return this.user2;
  }
}

