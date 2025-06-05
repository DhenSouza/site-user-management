import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;

    const token = localStorage.getItem('token');
    console.log('[AuthGuard] Token encontrado:', token);
    return !!token;
  }

  canActivate(): boolean | UrlTree {
    return this.isLoggedIn()
      ? true
      : this.router.parseUrl('/login');
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
