import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/warehouse-list'),
      },
      {
        path: ':id',
        loadComponent: () => import('./containers/warehouse-item'),
      },
    ],
  },
];
