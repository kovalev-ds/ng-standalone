import { CellInterface } from '@features/cell';
import { createFeature, createReducer, on } from '@ngrx/store';
import { loadListSuccess, loadOneSuccess } from './cell.actions';

export const CELL_FEATURE_KEY = 'CELL';

export interface CellState {
  items: CellInterface[];
  selected: CellInterface | null;
}

const initialState: CellState = {
  items: [],
  selected: null,
};

export const CellFeature = createFeature({
  name: CELL_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadListSuccess, (state, { data }) => ({ ...state, items: data })),
    on(loadOneSuccess, (state, { data }) => ({ ...state, selected: data }))
  ),
});
