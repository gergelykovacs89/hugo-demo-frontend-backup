import {Actions, Effect} from '@ngrx/effects';
import * as ProfileActions from './profile.actions';
import {AddAuthor, DeleteAuthor, UpdateAuthor} from './profile.actions';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../../store/app.reducers';

@Injectable()
export class ProfileEffects {

  @Effect({dispatch: false})
  addAuthor = this.actions$
    .ofType<AddAuthor>(ProfileActions.ADD_AUTHOR)
    .pipe(
      withLatestFrom(this.store),
      switchMap(([action, state]) => {
        const httpParams = new HttpParams()
          .append('userEmail', state.profile.user);
        return this.httpClient.post('http://localhost:8080/author/new', action.payload, {params: httpParams}
        );
      })
    );

  @Effect({dispatch: false})
  deleteAuthor = this.actions$
    .ofType<DeleteAuthor>(ProfileActions.DELETE_AUTHOR)
    .pipe(
      withLatestFrom(this.store),
      switchMap(([action]) => {
        const httpParams = new HttpParams()
          .append('authorToDelete', action.payload.authorName);
        return this.httpClient.post('http://localhost:8080/author/delete', null, {params: httpParams}
        );
      })
    );

  @Effect({dispatch: false})
  updateAuthor = this.actions$
    .ofType<UpdateAuthor>(ProfileActions.UPDATE_AUTHOR)
    .pipe(
      withLatestFrom(this.store),
      switchMap(([action, state]) => {
        const httpParams = new HttpParams()
          .append('userEmail', state.profile.user);
        return this.httpClient.put('http://localhost:8080/author/update', action.payload.updatedAuthor, {params: httpParams}
        );
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<AppState>) {
  }
}
