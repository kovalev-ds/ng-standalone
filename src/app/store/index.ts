import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AuthFeature, AuthEffects } from './auth';
import { WarehouseFeature, WarehouseEffects } from './warehouse';
import { LoaderFeature } from './loader';
import { CellEffects, CellFeature } from './cell';
import { ItemEffects, ItemFeature } from './item';

export const provideAppStore = () => [
  provideStore({}),
  provideState(AuthFeature),
  provideState(WarehouseFeature),
  provideState(CellFeature),
  provideState(ItemFeature),
  provideState(LoaderFeature),
  provideEffects([AuthEffects, WarehouseEffects, CellEffects, ItemEffects]),
  provideStoreDevtools(),
];
