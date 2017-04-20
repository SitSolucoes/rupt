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
  ok: boolean = false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean{
    let status: boolean = false
    this._authService.validateToken().subscribe(
      (response: boolean) => {
          return response;
      }
    );
    console.log(status);
    return status;
  }

}
