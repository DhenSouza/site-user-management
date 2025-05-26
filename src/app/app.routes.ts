import { Routes } from '@angular/router';
import { AuthGuard }  from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },

  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate:      [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
    ]
  },

  { path: '**', redirectTo: 'login' }
];
