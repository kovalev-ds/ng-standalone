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

  public create(data: Omit<WarehouseInterface, 'id'>): void {
    this.store.dispatch(createOneBegin({ data }));
  }

  public loadWarehouseList(): void {
    this.store.dispatch(loadListBegin());
  }

  public loadWarehouse(id: number): void {
    this.store.dispatch(loadOneBegin({ id }));
  }

  public getWarehouseList(): Observable<WarehouseInterface[]> {
    return this.store.select(getWarehouseList);
  }

  public get warehouse$(): Observable<WarehouseInterface | null> {
    return this.store.select(getWarehouse);
  }

  public removeWarehouse(): void {
    this.store.dispatch(removeOneBegin());
  }
}
