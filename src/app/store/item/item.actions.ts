import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types.enum';

import { ItemInterface } from '@features/item';

export const loadListBegin = createAction(ActionTypes.LoadListBegin);
export const loadListSuccess = createAction(
  ActionTypes.LoadListSuccess,
  props<{ data: ItemInterface[] }>()
);

export const loadOneBegin = createAction(
  ActionTypes.LoadOneBegin,
  props<{ id: number }>()
);
export const loadOneSuccess = createAction(
  ActionTypes.LoadOneSuccess,
  props<{ data: ItemInterface }>()
);

export const createOneBegin = createAction(
  ActionTypes.CreateOneBegin,
  props<{ data: Omit<ItemInterface, 'id'> }>()
);
export const createOneSuccess = createAction(ActionTypes.CreateOneSuccess);

export const updateOneBegin = createAction(
  ActionTypes.UpdateOneBegin,
  props<{ data: Partial<ItemInterface> }>()
);
export const updateOneSuccess = createAction(ActionTypes.UpdateOneSuccess);
