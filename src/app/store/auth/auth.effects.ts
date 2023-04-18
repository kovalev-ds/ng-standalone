import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import {
  EMPTY,
  catchError,
  exhaustMap,
  map,
  of,
  repeat,
  switchMap,
  tap,
} from 'rxjs';

import { AuthApi } from '@features/auth';
import { AppRouteEnum } from '@core/enums';
import {
  authenticate,
  checkAuthBegin,
  checkAuthFailure,
  signinBegin,
  signupBegin,
  signoutBegin,
  signoutSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private api: AuthApi,
    private router: Router
  ) {}

  ngrxOnInitEffects(): Action {
    return checkAuthBegin();
  }

  checkAuthBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthBegin),
      switchMap(() => {
        return this.api.me().pipe(
          map((response) => authenticate({ payload: response })),
          catchError(() => of(checkAuthFailure()))
        );
      })
    )
  );

  signinBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signinBegin),
      exhaustMap(({ payload }) => {
        return this.api.signin(payload).pipe(
          map((response) => authenticate({ payload: response })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  signupBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupBegin),
      exhaustMap(({ payload }) => {
        return this.api.signup(payload).pipe(
          map((response) => authenticate({ payload: response })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  signOutBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signoutBegin),
      exhaustMap(() => {
        return this.api.signout().pipe(
          map(() => signoutSuccess()),
          catchError(() => EMPTY)
        );
      })
    )
  );

  afterAuthSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticate),
        tap(() => {
          this.router.routerState.snapshot.url.includes(AppRouteEnum.Auth) &&
            this.router.navigate([AppRouteEnum.Home]);
        })
      ),
    {
      dispatch: false,
    }
  );

  afterSignoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutSuccess),
        tap(() => {
          this.router.navigate([AppRouteEnum.Auth]);
        })
      ),
    {
      dispatch: false,
    }
  );
}
