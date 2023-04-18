import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createOneBegin,
  getCellList,
  getSelectedCell,
  loadListBegin,
  loadOneBegin,
} from '@store/cell';
import { CellInterface } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class CellService {
  private readonly store = inject(Store);

  public items$ = this.store.select(getCellList);
  public selected$ = this.store.select(getSelectedCell);

  public loadList(): void {
    this.store.dispatch(loadListBegin());
  }

  public loadOne(id: number): void {
    this.store.dispatch(loadOneBegin({ id }));
  }

  public create(data: Omit<CellInterface, 'id'>): void {
    this.store.dispatch(createOneBegin({ data }));
  }
}
