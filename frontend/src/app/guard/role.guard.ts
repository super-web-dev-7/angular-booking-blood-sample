import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    public router: Router,
    public authService: AuthService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const role = route.data.userRole;
    if (currentUser) {
      console.log(currentUser);
      console.log(role);
      if (role.includes(currentUser.role)) {
        return true;
      } else {
        await this.router.navigate(['/login']);
        return false;
      }
    }
    await this.router.navigate(['/login']);
    return false;
  }
}
