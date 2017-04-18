import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Admin } from '../admin/administradores/admin';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AdministradoresService {
  private _url: string = 'http://localhost:8000/api/';
  constructor(private _http: Http) { }

  getAdmins(): Observable<any>{
     return this._http.get(this._url + 'getAdmins')
      .map(
        (response: Response) => {
          return response.json().admins;
        }
      );
  }

  getAdmin(id: number): Observable<any>{
     return this._http.get(this._url + 'getAdmin')
      .map(
        (response: Response) => {
          return response.json().admin;
        }
      );
  }

 

  createAdmin(form){
    //const token = this.authService.getToken();
    const body = JSON.stringify(
        {name: form.value.nome,
         email: form.value.email,
         password: form.value.senha
        }
    );
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this._url + 'storeAdmin', body, {headers: headers}).map(
    (response: Response)=>{
      response.json()
    });
    //return this._http.post('http://laravel-ng2-vue.dev/api/quote?token=' + token, body, {headers: headers});
  }

   validaEmail(email){
    return this._http.get(this._url + 'validaEmail/' + email)
      .map(
        (response: Response) => {
          return response.json().valido;
        }
      );
  }
}
