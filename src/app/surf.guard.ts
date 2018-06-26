import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SurfService } from './surf.service';
@Injectable()
export class SurfGuard implements CanActivate {

  constructor(private surfService: SurfService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.surfService.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }
}

@Injectable()
export class LogInGuard implements CanActivate {
  constructor(private surfService: SurfService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.surfService.isAuthenticated()) {
    //   this.router.navigate(['home']);
    //   return false;
    // }
    return true;
  }
}
