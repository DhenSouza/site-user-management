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
  loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    // redireciona automaticamente para /dashboard
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadComponent: () =>
        import('./menu/menu-management/menu-management.component')
        .then(m => m.MenuManagementComponent)
    },
    {
      path: 'create-user',
        loadComponent: () =>
          import('./user/create-user/create-user.component')
          .then(m => m.CreateUserComponent)
    },
    {
      path: 'list-users',
        loadComponent: () =>
          import('./user/users-list/users-list.component')
          .then(m => m.UsersListComponent)
    }
  ]
},

  { path: '**', redirectTo: 'login' }
];
