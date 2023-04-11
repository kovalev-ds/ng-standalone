import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadOneSuccess,
  createOneBegin,
  createOneSuccess,
  loadListBegin,
  loadListSuccess,
  loadOneBegin,
  removeOneBegin,
  removeOneSuccess,
} from './warehouse.actions';
import {
  EMPTY,
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { WarehouseApiService } from '@features/warehouse';
import { Store } from '@ngrx/store';
import { getWarehouse } from './warehouse.selectors';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums/app-route.enum';

@Injectable()
export class WarehouseEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(WarehouseApiService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  loadListBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadListBegin),
      switchMap(() => {
        return this.api.find().pipe(
          map((data) => loadListSuccess({ data })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  loadOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOneBegin),
      mergeMap(({ id }) => {
        return this.api.findById(id).pipe(
          map((data) => loadOneSuccess({ data })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOneBegin),
      mergeMap(({ data }) => {
        return this.api.createOne(data).pipe(
          map((data) => createOneSuccess({ data })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  removeOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeOneBegin),
      withLatestFrom(this.store.select(getWarehouse)),
      map(([_, x]) => x),
      filter((x) => x !== null),
      mergeMap((data) => {
        return data
          ? this.api.removeOne(data.id).pipe(
              map(() => removeOneSuccess()),
              catchError(() => EMPTY)
            )
          : EMPTY;
      })
    )
  );

  afterCreateOneSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOneSuccess),
      map(() => loadListBegin()),
      catchError(() => EMPTY)
    )
  );

  afterRemoveOneSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeOneSuccess),
        tap(() => this.router.navigate([AppRouteEnum.Home]))
      ),
    { dispatch: false }
  );
}
