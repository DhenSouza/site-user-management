import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
    {
    path: 'create-user',
    loadComponent: () => import('./user/create-user/create-user.component').then(m => m.CreateUserComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "**",
    redirectTo: "login"
  }
];
