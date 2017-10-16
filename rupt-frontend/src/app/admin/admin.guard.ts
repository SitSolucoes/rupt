import { AdministradoresService } from './../services/administradores.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from "rxjs/Observable";

@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private _adminService: AdministradoresService, 
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return Observable.create(
      observer => {
        return this._adminService.verificaLogin().subscribe(
          login => {
            if (login == true){
              observer.next(true);
            }
            else 
              this._router.navigate(['admin/login']);
              observer.next(false);
          }
        )
      }
    )
  }
}
