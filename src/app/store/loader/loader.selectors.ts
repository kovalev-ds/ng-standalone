import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOADER_FEATURE_KEY, LoaderState } from './loader.reducers';

const loaderFeatureSelector =
  createFeatureSelector<LoaderState>(LOADER_FEATURE_KEY);

export const isBusy = createSelector(
  loaderFeatureSelector,
  (state) => state.counter > 0
);
