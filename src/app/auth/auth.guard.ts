import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate() {
    // Allow access if user is authenticated
    if (this.authService.isAuthenticated()) {
      return true;
    }
    // not logged in? So redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
