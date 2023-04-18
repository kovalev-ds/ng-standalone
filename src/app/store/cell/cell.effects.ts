import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CellsApiService } from '@features/cell';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  createOneBegin,
  createOneSuccess,
  loadListBegin,
  loadListSuccess,
  loadOneBegin,
  loadOneSuccess,
} from './cell.actions';

import { loadListBegin as loadItemListBegin } from '../item';
import { EMPTY, catchError, map, mergeMap, withLatestFrom } from 'rxjs';
import { getWarehouse } from '@store/warehouse';

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
