import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITEM_FEATURE_KEY, ItemState } from './item.reducers';

const itemFeatureSelector = createFeatureSelector<ItemState>(ITEM_FEATURE_KEY);

export const getItems = createSelector(
  itemFeatureSelector,
  (state) => state.items
);
