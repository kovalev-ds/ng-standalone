import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types.enum';
import { ItemInterface } from '@features/item';

export const loadListBegin = createAction(ActionTypes.LoadListBegin);
export const loadListSuccess = createAction(
  ActionTypes.LoadListSuccess,
  props<{ data: ItemInterface[] }>()
);

export const createOneBegin = createAction(
  ActionTypes.CreateOneBegin,
  props<{ data: Omit<ItemInterface, 'id'> }>()
);
export const createOneSuccess = createAction(ActionTypes.CreateOneSuccess);
