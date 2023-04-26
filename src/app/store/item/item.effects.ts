import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  EMPTY,
  catchError,
  exhaustMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs';

import { ItemsApiService } from '@features/item';
import { getSelectedCell } from '@store/cell';

import {
  createOneBegin,
  loadListBegin,
  loadListSuccess,
  loadOneBegin,
  loadOneSuccess,
  updateOneBegin,
} from './item.actions';
import { getSelectedItem } from './item.selectors';

@Injectable()
export class ItemEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly api = inject(ItemsApiService);

  loadListBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadListBegin),
      withLatestFrom(this.store.select(getSelectedCell)),
      exhaustMap(([_, cell]) => {
        return cell
          ? this.api.findByCellId(cell.id).pipe(
              map(({ items }) => loadListSuccess({ data: items })),
              catchError(() => EMPTY)
            )
          : EMPTY;
      })
    )
  );

  loadOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOneBegin),
      exhaustMap(({ id }) => {
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
      withLatestFrom(this.store.select(getSelectedCell)),
      mergeMap(([{ data }, cell]) => {
        return cell
          ? this.api.createOne({ ...data, cellId: cell.id }).pipe(
              map(() => loadListBegin()),
              catchError(() => EMPTY)
            )
          : EMPTY;
      })
    )
  );

  updateOneBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOneBegin),
      withLatestFrom(this.store.select(getSelectedItem)),
      mergeMap(([{ data }, item]) => {
        return item
          ? this.api.updateOne(item.id, { ...item, ...data }).pipe(
              map(() => loadOneBegin({ id: item.id })),
              catchError(() => EMPTY)
            )
          : EMPTY;
      })
    )
  );
}
