import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthUserInterface } from '@features/auth/interfaces';
import { authenticate, checkAuthFailure, signoutSuccess } from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH';

export interface AuthState {
  isLoggedIn: boolean | null;
  user: AuthUserInterface | null;
  token: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: null,
  user: null,
  token: null,
};

export const AuthFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(authenticate, (state, { payload: { user, token } }) => ({
      ...state,
      isLoggedIn: true,
      user,
      token,
    })),
    on(checkAuthFailure, (state) => ({ ...state, isLoggedIn: false })),
    on(signoutSuccess, () => initialState)
  ),
});
