import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

import { AuthApi } from '@features/auth';
import {
  checkAuthBegin,
  checkAuthSuccess,
  signinBegin,
  signinSuccess,
  signoutBegin,
  signoutSuccess,
  signupBegin,
  signupSuccess,
} from './auth.actions';
import { AppRouteEnum } from '@core/enums/app-route.enum';

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
      exhaustMap(() => {
        return this.api.me().pipe(
          map((response) => checkAuthSuccess({ payload: response })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  signinBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signinBegin),
      exhaustMap(({ payload }) => {
        return this.api.signin(payload).pipe(
          map((response) => signinSuccess({ payload: response })),
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
          map((response) => signupSuccess({ payload: response })),
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
        ofType(signinSuccess, signupSuccess, checkAuthSuccess),
        tap(() => {
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
