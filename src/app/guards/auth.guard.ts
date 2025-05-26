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

    private isLoggedIn(): boolean {
      // no SSR não há window nem localStorage
      if (typeof window === 'undefined') {
        return false; 
      }

      const token = localStorage.getItem('token');
      console.log('Token recuperado (browser):', token);
      return !!token;
    }



  canActivate(): boolean | UrlTree {
    if (this.isLoggedIn()) return true;
    return this.router.parseUrl('/login');
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
