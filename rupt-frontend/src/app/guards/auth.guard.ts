import { MockNgModuleResolver } from '@angular/compiler/testing';
import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRoute, 
         ActivatedRouteSnapshot, RouterStateSnapshot,
         Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private _authService: AuthService,
              private _router: Router) { }
  ok: any = null;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean{
    if(this._authService.getToken()){
      return true;
    }
      
    this._router.navigate(['/admin/login']);
    return false;
  }

}
