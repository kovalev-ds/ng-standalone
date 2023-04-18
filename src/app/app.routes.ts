import { Routes } from '@angular/router';

import { shouldBeAuthenticated } from '@features/auth';

import { AppRouteEnum } from './core/enums';
import { MainLayoutComponent } from './layouts';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: AppRouteEnum.Home },
      {
        path: AppRouteEnum.Home,
        component: MainLayoutComponent,
        canMatch: [
          shouldBeAuthenticated((router) =>
            router.navigate([AppRouteEnum.Auth])
          ),
        ],
        loadChildren: () => import('./pages/dashboard'),
      },
      {
        path: AppRouteEnum.Auth,
        loadChildren: () => import('./pages/auth'),
      },
    ],
  },
];
