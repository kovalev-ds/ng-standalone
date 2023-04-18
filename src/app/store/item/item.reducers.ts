import { createFeature, createReducer, on } from '@ngrx/store';
import { loadListSuccess } from './item.actions';
import { ItemInterface } from '@features/item';

export const ITEM_FEATURE_KEY = 'ITEM';

export interface ItemState {
  items: ItemInterface[];
}

const initialState: ItemState = {
  items: [],
};

export const ItemFeature = createFeature({
  name: ITEM_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadListSuccess, (state, { data }) => ({ ...state, items: data }))
  ),
});
