import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./containers/warehouse-list-page'),
      },
      {
        path: ':id',
        loadComponent: () => import('./containers/warehouse-item-page'),
        children: [
          {
            path: 'cells/:id',
            pathMatch: 'full',
            loadComponent: () => import('./containers/cell-page'),
          },
          {
            path: 'cells/:id/items/:id',
            loadComponent: () => import('./containers/item-page'),
          },
        ],
      },
    ],
  },
];
