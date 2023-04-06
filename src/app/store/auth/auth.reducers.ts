import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthUserInterface } from '@features/auth/interfaces';
import {
  checkAuthSuccess,
  signinSuccess,
  signoutSuccess,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH';

export interface AuthSlice {
  [AUTH_FEATURE_KEY]: AuthState;
}

export interface AuthState {
  user: AuthUserInterface | null;
  token: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
};

export const AuthFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(
      signinSuccess,
      signinSuccess,
      checkAuthSuccess,
      (state, { payload: { user, token } }) => ({
        ...state,
        user,
        token,
      })
    ),
    on(signoutSuccess, () => initialState)
  ),
});
