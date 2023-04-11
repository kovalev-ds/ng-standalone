import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types.enum';
import { WarehouseInterface } from '@features/warehouse/interfaces';

export const createOneBegin = createAction(
  ActionTypes.CreateOneBegin,
  props<{ data: Omit<WarehouseInterface, 'id'> }>()
);
export const createOneSuccess = createAction(
  ActionTypes.CreateOneSuccess,
  props<{ data: WarehouseInterface }>()
);

export const loadListBegin = createAction(ActionTypes.LoadListBegin);
export const loadListSuccess = createAction(
  ActionTypes.LoadListSuccess,
  props<{ data: WarehouseInterface[] }>()
);

export const loadOneBegin = createAction(
  ActionTypes.LoadOneBegin,
  props<{ id: number }>()
);
export const loadOneSuccess = createAction(
  ActionTypes.LoadOneSuccess,
  props<{ data: WarehouseInterface }>()
);

export const removeOneBegin = createAction(ActionTypes.RemoveOneBegin);
export const removeOneSuccess = createAction(ActionTypes.RemoveOneSuccess);
