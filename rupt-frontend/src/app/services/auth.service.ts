import { NgForm } from '@angular/forms/src/directives';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private _http: Http) {

  }

  private _url: string = 'http://localhost:8000/api/';


  signin(form: NgForm) {
    return this._http.post(this._url + 'signin', {email: form.value.email, password: form.value.senha}, {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
      .map(
        (response: Response) => {
          const token = response.json().token;
          const admin_name = response.json().admin_name;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return {token: token, 
                  decoded: JSON.parse(window.atob(base64)), 
                  admin_name: admin_name}
        })
        .do(
        tokenData => {
          localStorage.setItem('token', tokenData.token);
          localStorage.setItem('adminLogado', tokenData.admin_name);
        }
      );
  }

  logout(){
    let token = this.getToken();
    return this._http.get(this._url + 'invalidaToken?token=' + token)
      .map(
        (response: Response) => {
          return response.json().result;
        }
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  validateToken(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let valido = false;
    //console.log('chegou aqui');
    let token = this.getToken();
    return this._http.get(this._url + 'validaToken?token=' + token, {headers: headers})
        .map(
          (response: Response) => {
            return response.json().valido;
          }
        );
  }
}
