import { createAction, props } from '@ngrx/store';

import {
  AuthResponseInterface,
  SignInInterface,
  SignUpInterface,
} from '@features/auth';

import { ActionTypes } from './action-types.enum';

export const checkAuthBegin = createAction(ActionTypes.CheckAuthBegin);
export const checkAuthFailure = createAction(ActionTypes.CheckAuthFailure);

export const signinBegin = createAction(
  ActionTypes.SignInBegin,
  props<{ payload: SignInInterface }>()
);
export const signupBegin = createAction(
  ActionTypes.SignUpBegin,
  props<{ payload: SignUpInterface }>()
);

export const authenticate = createAction(
  ActionTypes.Authenticate,
  props<{ payload: AuthResponseInterface }>()
);

export const signoutBegin = createAction(ActionTypes.SignOutBegin);
export const signoutSuccess = createAction(ActionTypes.SignOutSuccess);
