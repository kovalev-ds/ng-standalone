import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map, mergeMap, withLatestFrom } from 'rxjs';

import { ItemsApiService } from '@features/item';
import { getSelectedCell } from '@store/cell';

import { createOneBegin, loadListBegin, loadListSuccess } from './item.actions';

@Injectable()
export class ItemEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly api = inject(ItemsApiService);

  loadListBegin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadListBegin),
      withLatestFrom(this.store.select(getSelectedCell)),
      mergeMap(([_, cell]) => {
        return cell
          ? this.api.findByCellId(cell.id).pipe(
              map((data) => loadListSuccess({ data })),
              catchError(() => EMPTY)
            )
          : EMPTY;
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
}
