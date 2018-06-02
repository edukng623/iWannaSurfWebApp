import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SurfService } from './surf.service';
@Injectable()
export class SurfGuard implements CanActivate {
  logged: Boolean = false;
  constructor(private surfService: SurfService, private router: Router){

  }
  canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if(!this.surfService.isAuthenticated()){
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return true;
  }
}
