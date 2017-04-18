import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  constructor(private http: Http) {

  }

  private _url: string = 'http://localhost:8000/api/';


  /*signin(email: string, password: string) {
    return this.http.post(this._url + 'signin',
      {email: email, 
       password: password},
      {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
      .map(
        (response: Response) => {
          const token = response.json().token;
          //const admin_name = response.json().admin.name;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          return {token: token, decoded: JSON.parse(window.atob(base64))};
        }
      )
      .do(
        tokenData => {
          localStorage.setItem('token', tokenData.token);
          //localStorage.setItem('adminLogado', )
        }
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }*/
}
