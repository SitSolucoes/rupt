import { LeitoresService } from './../services/leitores.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from "rxjs/Observable";

@Injectable()
export class InternetGuard implements CanActivate{

  constructor(private _leitorService: LeitoresService, 
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return Observable.create(
      observer => {
        return this._leitorService.verificaLogin(false).subscribe(
          login => {
            if (login == true){
              observer.next(true);
            }
            else 
              this._router.navigate(['/login']);
              observer.next(false);
          }
        )
      }
    )
  }
}
