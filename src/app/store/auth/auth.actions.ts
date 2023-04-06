import { createAction, props } from '@ngrx/store';

import { ActionTypes } from './action-types.enum';
import {
  AuthResponseInterface,
  SignInInterface,
  SignUpInterface,
} from '@features/auth';

export const signinBegin = createAction(
  ActionTypes.SignInBegin,
  props<{ payload: SignInInterface }>()
);

export const signinSuccess = createAction(
  ActionTypes.SignInSuccess,
  props<{ payload: AuthResponseInterface }>()
);

export const signupBegin = createAction(
  ActionTypes.SignUpBegin,
  props<{ payload: SignUpInterface }>()
);

export const signupSuccess = createAction(
  ActionTypes.SignUpSuccess,
  props<{ payload: AuthResponseInterface }>()
);

export const checkAuthBegin = createAction(ActionTypes.CheckAuthBegin);

export const checkAuthSuccess = createAction(
  ActionTypes.CheckAuthSuccess,
  props<{ payload: AuthResponseInterface }>()
);

export const signoutBegin = createAction(ActionTypes.SignOutBegin);
export const signoutSuccess = createAction(ActionTypes.SignOutSuccess);
