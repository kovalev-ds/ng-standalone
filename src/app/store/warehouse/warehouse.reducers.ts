import { WarehouseInterface } from '@features/warehouse/interfaces';
import { createFeature, createReducer, on } from '@ngrx/store';
import { loadOneSuccess, loadListSuccess } from './warehouse.actions';

export const WAREHOUSE_FEATURE_KEY = 'WAREHOUSE';

export interface WarehouseSlice {
  [WAREHOUSE_FEATURE_KEY]: WarehouseState;
}

export interface WarehouseState {
  warehouses: WarehouseInterface[];
  selected: WarehouseInterface | null;
}

export const initialState: WarehouseState = {
  warehouses: [],
  selected: null,
};

export const WarehouseFeature = createFeature({
  name: WAREHOUSE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadListSuccess, (state, { data }) => ({
      ...state,
      warehouses: data,
    })),
    on(loadOneSuccess, (state, { data }) => ({ ...state, selected: data }))
  ),
});
