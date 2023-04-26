import { createFeature, createReducer, on } from '@ngrx/store';
import { loadListSuccess, loadOneSuccess } from './item.actions';
import { ItemInterface } from '@features/item';

export const ITEM_FEATURE_KEY = 'ITEM';

export interface ItemState {
  items: ItemInterface[];
  selected: ItemInterface | null;
}

const initialState: ItemState = {
  items: [],
  selected: null,
};

export const ItemFeature = createFeature({
  name: ITEM_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadListSuccess, (state, { data }) => ({
      ...state,
      items: data,
    })),
    on(loadOneSuccess, (state, { data }) => ({ ...state, selected: data }))
  ),
});
