import * as ProfileActions from './profile.actions';
import {AuthorModel} from '../../shared/models/author.model';


export interface State {
  authors: AuthorModel[];
  selectedAuthor: AuthorModel;
  selected: boolean;
  user: string;
}

const localState = JSON.parse(localStorage.getItem('appState'));

const initialState = localState !== null && localState['selected'] !== false ? localState : {
  authors: null,
  selectedAuthor: null,
  selected: false,
  user: null
};

export function ProfileReducers(state = initialState, action: ProfileActions.ProfileActions) {
  switch (action.type) {
    case ProfileActions.SELECT_AUTHOR:
      return {
        ...state,
        selectedAuthor: state.authors.find(author => author.name === action.payload),
        selected: true
      };
    case ProfileActions.START_SELECT_AUTHOR:
      return {
        ...state,
        selectedAuthor: null,
        selected: false
      };
    case ProfileActions.SET_AUTHORS:
      return {
        ...state,
        authors: action.payload
      };
    case ProfileActions.LOGOUT:
      return {
        authors: null,
        selectedAuthor: null,
        selected: false,
        user: null
      };
    case ProfileActions.ADD_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, action.payload]
      };
    case ProfileActions.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ProfileActions.DELETE_AUTHOR:
      const authors = [...state.authors];
      authors.splice(action.payload.authorIndex, 1);
      return {
        ...state,
        authors: authors
      };
    case ProfileActions.UPDATE_AUTHOR:
      const authorToUpdate = state.authors[action.payload.index];
      const updatedAuthor = {
        ...authorToUpdate,
        ...action.payload.updatedAuthor
      };
      const updatedAuthors = [...state.authors];
      updatedAuthors[action.payload.index] = updatedAuthor;
      return {
        ...state,
        authors: updatedAuthors
      };
    default:
      return state;
  }
}
