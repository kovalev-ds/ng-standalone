import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthRouteEnum } from './enums/auth-route.enum';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: AuthRouteEnum.SignIn, pathMatch: 'full' },
      {
        path: AuthRouteEnum.SignIn,
        loadComponent: () => import('./containers/signin'),
      },
      {
        path: AuthRouteEnum.SignUp,
        loadComponent: () => import('./containers/signup'),
      },
    ],
  },
];
