import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CELL_FEATURE_KEY, CellState } from './cell.reducers';

const cellFeatureSelector = createFeatureSelector<CellState>(CELL_FEATURE_KEY);

export const getCellList = createSelector(
  cellFeatureSelector,
  (state) => state.items
);
export const getSelectedCell = createSelector(
  cellFeatureSelector,
  (state) => state.selected
);
