import {Injectable, OnInit} from '@angular/core';
import {AuthorModel} from '../shared/models/author.model';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {DataStorageDummyService} from '../shared/data-storage-dummy.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';
import {HttpClient} from '@angular/common/http';
import {parse, stringify} from 'flatted/esm';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {
  constructor(private userService: UserService,
              private dataStorage: DataStorageDummyService,
              private store: Store<AppState>,
              private httpClient: HttpClient) {
  }

  public userAuthors: AuthorModel[];


  ngOnInit() {
    this.store.subscribe((state) => {
      console.log(state.profile.authors);
      this.userAuthors = state.profile.authors;
    });
  }

  getAuthorByName(name: string): Observable<AuthorModel> {
    return this.httpClient.get<AuthorModel>('http://localhost:8080/author/' + name);
  }

  addFollower(follower: AuthorModel, following: AuthorModel) {

  }

  removeFollower(follower: AuthorModel, following: AuthorModel) {

  }


}
