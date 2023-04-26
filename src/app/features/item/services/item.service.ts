import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  createOneBegin,
  getItems,
  getSelectedItem,
  loadOneBegin,
  updateOneBegin,
} from '@store/item';
import { ItemInterface } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly store = inject(Store);

  public items$ = this.store.select(getItems);
  public selected$ = this.store.select(getSelectedItem);

  public createOne(data: Omit<ItemInterface, 'id'>): void {
    this.store.dispatch(createOneBegin({ data }));
  }

  public updateOne(data: Partial<ItemInterface>): void {
    this.store.dispatch(updateOneBegin({ data }));
  }

  public loadById(id: number): void {
    this.store.dispatch(loadOneBegin({ id }));
  }
}
