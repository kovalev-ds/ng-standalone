import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducers';

const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isAuthenticated = createSelector(
  authFeatureSelector,
  (state) => state.isLoggedIn
);

export const getCurrentUser = createSelector(
  authFeatureSelector,
  (state) => state.user
);
