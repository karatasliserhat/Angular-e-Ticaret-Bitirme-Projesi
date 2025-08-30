import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth-layout/auth-layout'),
    children: [
      {
        path: 'auth/register',
        loadComponent: () => import('./register/register'),
      },
      {
        path: 'auth/login',
        loadComponent: () => import('./login/login'),
      }
    ],
  },
];

export default routes


