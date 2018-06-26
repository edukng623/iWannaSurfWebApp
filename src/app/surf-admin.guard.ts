import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SurfService } from './surf.service';

@Injectable()
export class SurfAdminGuard implements CanActivate {
  constructor(private surfService: SurfService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.surfService.isAuthenticated();
  }
}
