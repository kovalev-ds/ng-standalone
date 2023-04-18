import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { provideAppStore } from '@store';
import {
  authenticationInterceptor,
  httpErrorsInterceptor,
  globalLoaderInterceptor,
} from '@core/interceptors';

import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideAppStore(),
    provideRouter(AppRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptors([
        globalLoaderInterceptor(),
        authenticationInterceptor(() => console.log('Unauthenticated')),
        httpErrorsInterceptor(),
      ])
    ),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch(console.log);
