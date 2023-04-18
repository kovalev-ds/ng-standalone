import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types.enum';
import { CellInterface } from '@features/cell/interfaces/cell.interface';

export const loadListBegin = createAction(ActionTypes.LoadListBegin);

export const loadListSuccess = createAction(
  ActionTypes.LoadListSuccess,
  props<{ data: CellInterface[] }>()
);

export const createOneBegin = createAction(
  ActionTypes.CreateOneBegin,
  props<{ data: Omit<CellInterface, 'id'> }>()
);

export const createOneSuccess = createAction(ActionTypes.CreateOneSuccess);

export const loadOneBegin = createAction(
  ActionTypes.LoadOneBegin,
  props<{ id: number }>()
);

export const loadOneSuccess = createAction(
  ActionTypes.LoadOneSuccess,
  props<{ data: CellInterface }>()
);
