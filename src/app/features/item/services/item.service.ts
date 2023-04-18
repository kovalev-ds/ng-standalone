import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createOneBegin, getItems } from '@store/item';
import { ItemInterface } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly store = inject(Store);

  public items$ = this.store.select(getItems);

  public createOne(data: Omit<ItemInterface, 'id'>): void {
    this.store.dispatch(createOneBegin({ data }));
  }
}
