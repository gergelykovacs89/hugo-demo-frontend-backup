import {Action} from '@ngrx/store';
import {AuthorModel} from '../../shared/models/author.model';

export const SELECT_AUTHOR = 'SELECT_AUTHOR';
export const START_SELECT_AUTHOR = 'START_SELECT_AUTHOR';
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR';
export const SET_AUTHORS = 'SET_AUTHORS';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const ADD_AUTHOR = 'ADD_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';


export class SelectAuthor implements Action {
  readonly type = SELECT_AUTHOR;

  constructor(public payload: string) {
  }
}

export class StartSelectAuthor implements Action {
  readonly type = START_SELECT_AUTHOR;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetAuthors implements Action {
  readonly type = SET_AUTHORS;

  constructor(public payload: any) {
  }
}

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: string) {
  }
}

export class DeleteAuthor implements Action {
  readonly type = DELETE_AUTHOR;

  constructor(public payload: { authorIndex: number, authorName: string }) {
  }
}

export class AddAuthor implements Action {
  readonly type = ADD_AUTHOR;

  constructor(public payload: AuthorModel) {
  }
}

export class UpdateAuthor implements Action {
  readonly type = UPDATE_AUTHOR;

  constructor(public payload: { index: number, updatedAuthor: AuthorModel }) {
  }
}

export type ProfileActions = SelectAuthor |
  SetAuthors |
  Logout |
  AddAuthor |
  SetUser |
  DeleteAuthor |
  UpdateAuthor |
  StartSelectAuthor;
