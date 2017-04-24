import { NgForm } from '@angular/forms/src/directives';
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private _http: Http,
              private _router: Router) {

  }

  private _url: string = 'http://localhost:8000/api/';

  private token: string;


  signin(form: NgForm) {
    const body = {
      email: form.value.email, 
      password: form.value.senha
    }
    return this._http.post(this._url + 'signin', body , {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
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
          this.token = tokenData.token;
        }
      );
  }

  logout(){
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  envia_esqueciSenha(form: NgForm){
    const body = {
      email: form.value.email
    };
    let resp: string = '';
    return this._http.put(this._url + 'envia_esqueciSenha', body, {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
                     .map(
                        response => {
                          //resp = response.json().retorno;
                          return response;
                        }
                     );
  }

  
}
