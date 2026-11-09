import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: DashboardLayout,
    canActivate: [autoLoginPartialRoutesGuard],
    children: [
      {
        path: 'inbox',
        pathMatch: 'full',
        loadComponent: () => import('../app/pages/inbox/inbox').then((c) => c.Inbox),
      },
      { path: '', pathMatch: 'full', redirectTo: 'inbox' },
    ],
  },
];
