import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { WarehouseInterface } from '../interfaces';
import {
  createOneBegin,
  getWarehouse,
  getWarehouseList,
  loadListBegin,
  loadOneBegin,
  removeOneBegin,
} from '@store/warehouse';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private readonly store = inject(Store);

  public items$ = this.store.select(getWarehouseList);
  public item$ = this.store.select(getWarehouse);

  public create(data: Omit<WarehouseInterface, 'id'>): void {
    this.store.dispatch(createOneBegin({ data }));
  }

  public loadList(): void {
    this.store.dispatch(loadListBegin());
  }

  public loadOne(id: number): void {
    this.store.dispatch(loadOneBegin({ id }));
  }

  public remove(): void {
    this.store.dispatch(removeOneBegin());
  }
}
