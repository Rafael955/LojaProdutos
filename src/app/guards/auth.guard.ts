import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { config } from '../config/environment';

const allowedRoutes: string[] = [
  '/pages/cadastrar-fornecedor',
  '/pages/editar-fornecedor/'
];

@Injectable({ providedIn: 'root' })
class PermissionsService {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const usuario = JSON.parse(sessionStorage.getItem('usuario') as string);

    if (usuario) {

      if (allowedRoutes.some(url => state.url.includes(url))) {

        if (usuario.perfil === 'ADMINISTRADOR') {
          return true;
        } else {
          this.router.navigate(['/errors/unauthorized']);
          return false;
        }

      }

      return true;
    }

    this.router.navigate(['/pages/autenticar-usuario']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => { return inject(PermissionsService).canActivate(route, state) };
