import { createFeature, createReducer, on } from '@ngrx/store';
import { loadingFinish, loadingStart } from './loader.actions';

export const LOADER_FEATURE_KEY = 'LOADER';

export interface AuthSlice {
  [LOADER_FEATURE_KEY]: LoaderState;
}

export interface LoaderState {
  counter: number;
}

export const initialState: LoaderState = {
  counter: 0,
};

export const LoaderFeature = createFeature({
  name: LOADER_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadingStart, (state) => ({ ...state, counter: state.counter + 1 })),
    on(loadingFinish, (state) => ({ ...state, counter: state.counter - 1 }))
  ),
});
