import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY, catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs';

import { AppRouteEnum } from '@core/enums';
import { CellsApiService } from '@features/cell';
import { getWarehouse } from '@store/warehouse';
import {
  createOneBegin,
  createOneSuccess,
  loadListBegin,
  loadListSuccess,
  loadOneBegin,
  loadOneSuccess,
  removeOneBegin,
  removeOneSuccess,
} from './cell.actions';

import { loadListBegin as loadItemListBegin } from '../item';

@Injectable()
export class CellEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(CellsApiService);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  loadListBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadListBegin),
      withLatestFrom(this.store.select(getWarehouse)),
      mergeMap(([_, warehouse]) => {
        return warehouse
          ? this.api.findByWarehouseId(warehouse.id).pipe(
              map((data) => loadListSuccess({ data })),
              catchError(() => EMPTY)
            )
          : EMPTY;
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

  removeOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeOneBegin),
      mergeMap(({ id }) => {
        return this.api.removeOne(id).pipe(
          map(() => removeOneSuccess()),
          catchError(() => EMPTY)
        );
      })
    )
  );

  afterRemoveOneSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeOneSuccess),
      withLatestFrom(this.store.select(getWarehouse)),
      tap(([_, warehouse]) => {
        this.router.navigate([AppRouteEnum.Home, warehouse?.id]);
      }),
      map(() => loadListBegin())
    )
  );

  afterLoadOneSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOneSuccess),
      map(() => loadItemListBegin())
    )
  );

  createOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOneBegin),
      withLatestFrom(this.store.select(getWarehouse)),
      mergeMap(([{ data }, warehouse]) => {
        return warehouse
          ? this.api.createOne({ ...data, warehouseId: warehouse.id }).pipe(
              map(() => createOneSuccess()),
              catchError(() => EMPTY)
            )
          : EMPTY;
      })
    )
  );

  afterCreateOneSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOneSuccess),
      map(() => loadListBegin())
    )
  );
}
