import { ConnectionFactory } from './../classes/connection-factory';
import { Admin } from './../admin/admin';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AdministradoresService {
  private _url: string = ConnectionFactory.API_CONNECTION;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http: Http) { }

  private createBody(form){
    return JSON.stringify(
        {name: form.value.nome,
         email: form.value.email,
         password: form.value.senha,
         ativo: form.value.ativo
        });
  }

  getAdmins(): Observable<any>{
     return this._http.get(this._url + 'getAdmins')
      .map(
        (response: Response) => {
          return response.json().admins;
        }
      );
  }

  getAdmin(id: number): Observable<any>{
     return this._http.get(this._url + 'getAdmin/' + id)
      .map(
        (response: Response) => {
          return response.json().admin;
        }
      );
  }

 createAdmin(form){
    const body = this.createBody(form);
    
    return this._http.post(this._url + 'storeAdmin', body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
    //return this._http.post('http://laravel-ng2-vue.dev/api/quote?token=' + token, body, {headers: headers});
  }  

  redefineSenha(form, token){
    const body = JSON.stringify({
              senha: form.value.nova_senha,
              token: token
        });
    
    return this._http.post(this._url + 'redefineSenha', body, {headers: this.headers}).map(
      (response: Response)=>{
        response.json()
      });
    
  }  

  updateAdmin(form, id){
    const body = this.createBody(form);

    console.log(form);
    
    return this._http.put(this._url + 'updateAdmin/'+ id, body, {headers: this.headers}).map(
    (response: any)=>{
      console.log("editou");
      return response.json().message;
    });
  }

   validaEmail(email, id){
    return this._http.get(this._url + 'validaEmail/' + email + "/" + id)
      .map(
        (response: Response) => {
          console.log("retorna: "+response.json().valido);
          return response.json().valido;
        }
      );
  }

  validaTokenRedefine(token){
    console.log(token);
    return this._http.get(this._url + 'validaTokenRedefine/' + token)
      .map(
        (response: Response) => {
          console.log("retorna: "+response.json().valido);
          return response.json().valido;
        }
      );
  }
}
