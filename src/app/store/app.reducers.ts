import * as fromProfile from '../profile/store/profile.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  profile: fromProfile.State;
}

export const reducers: ActionReducerMap<AppState> = {
  profile: fromProfile.ProfileReducers
};
