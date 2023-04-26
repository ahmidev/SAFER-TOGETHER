import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const isAdmin = roles.some((role: any) => role.name === 'ADMIN');

    if (isAdmin) {
      return true;
    } else {
      // Rediriger l'utilisateur vers une autre page s'il n'est pas administrateur
      this.router.navigate(['/parentmap']);
      return false;
    }
  }
  
}
