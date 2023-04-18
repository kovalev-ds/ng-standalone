import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  getCurrentUser,
  isAuthenticated,
  signinBegin,
  signoutBegin,
  signupBegin,
} from '@store/auth';

import { SignInInterface, SignUpInterface } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly store = inject(Store);

  public user$ = this.store.select(getCurrentUser);
  public isAuthenticated$ = this.store.select(isAuthenticated);

  public signin(credentials: SignInInterface) {
    this.store.dispatch(signinBegin({ payload: credentials }));
  }

  public signup(credentials: SignUpInterface) {
    this.store.dispatch(signupBegin({ payload: credentials }));
  }

  public signout() {
    this.store.dispatch(signoutBegin());
  }
}
