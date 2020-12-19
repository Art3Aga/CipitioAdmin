import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('user')) {
      return true;
    }
    else {
      this.route.navigateByUrl('/login');
      return false;
    }
  }

  /*canActivate() {
    if(localStorage.getItem('user')) {
      return true;
    }
    else {
      this.route.navigateByUrl('/login');
      return false;
    }
  }*/

}
