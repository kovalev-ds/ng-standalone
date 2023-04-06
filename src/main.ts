import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthInterceptor, HttpErrorsInterceptor } from '@core/interceptors';
import { AuthEffects, AuthFeature } from '@store/auth';

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({}),
    provideState(AuthFeature),
    provideEffects([AuthEffects]),
    provideStoreDevtools(),
    provideHttpClient(
      withInterceptors([
        AuthInterceptor(() => console.log('Unauthenticated')),
        HttpErrorsInterceptor,
      ])
    ),
    provideRouter(AppRoutes, withPreloading(PreloadAllModules)),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch(console.log);
