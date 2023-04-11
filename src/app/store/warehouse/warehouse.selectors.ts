import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WAREHOUSE_FEATURE_KEY, WarehouseState } from './warehouse.reducers';

const authFeatureSelector = createFeatureSelector<WarehouseState>(
  WAREHOUSE_FEATURE_KEY
);

export const getWarehouseList = createSelector(
  authFeatureSelector,
  (state) => state.warehouses
);

export const getWarehouse = createSelector(
  authFeatureSelector,
  (state) => state.selected
);
