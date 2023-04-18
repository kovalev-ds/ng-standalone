import { createAction } from '@ngrx/store';
import { ActionTypes } from './action-types.enum';

export const loadingStart = createAction(ActionTypes.LoadingStart);
export const loadingFinish = createAction(ActionTypes.LoadingFinish);
