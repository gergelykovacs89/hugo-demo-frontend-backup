import {Injectable} from '@angular/core';
import {UserModel} from '../shared/models/user.model';
import {DataStorageDummyService} from '../shared/data-storage-dummy.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private dataStorage: DataStorageDummyService) {
  }


  public getUserById(userId: number): UserModel {
    return this.dataStorage.getUserById(userId);
  }
}

