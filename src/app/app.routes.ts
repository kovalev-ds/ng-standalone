import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { AppRouteEnum } from './core/enums/app-route.enum';
import { MainLayoutComponent } from './layouts';

import { shouldBeAuthenticated } from '@features/auth';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: AppRouteEnum.Home,
        component: MainLayoutComponent,
        canActivate: [
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
