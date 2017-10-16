import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Base64 } from 'app/shared/Base64';
import { Admin } from 'app/classes/admin';

@Injectable()
export class AdministradoresService {
  public admin = new EventEmitter<Admin>();
  private base64: Base64 = new Base64();
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
        return response.json().message;
    });
  }

   validaEmail(email, id){
    return this._http.get(this._url + 'validaEmail/' + email + "/" + id)
      .map(
        (response: Response) => {
          return response.json().valido;
        }
      );
  }

  validaTokenRedefine(token){
    return this._http.get(this._url + 'validaTokenRedefine/' + token)
      .map(
        (response: Response) => {
          return response.json().valido;
        }
      );
  }

  signin(form: NgForm) {
    const body = JSON.stringify(form.value);
    
    return this._http.put(this._url + 'admin/signin', body, {headers: this.headers}).map(
      (response: Response) => { 
        if (response.json().login == true){
          localStorage.setItem('a', this.base64.encode(response.json().admin.id));
          localStorage.setItem('token', response.json().token);

          this.admin.emit(response.json().admin);
          
          return [true, response.json().admin];
        }
        else {
          return [false, response.json().login];
        }
      }
    )
  }

  verificaLogin(){
    let token = localStorage.getItem("token");
    let id = this.base64.decode(localStorage.getItem("a"));
    
    const body = JSON.stringify({
      id: id,
      token: token
    })

    return this._http.post(this._url + 'admin/verificaLogin', body, {headers: this.headers}).map(
      (response: Response) => {
        if (response.json().admin != false){
          this.admin.emit(response.json().admin);
            
          return true;
        }

        return response.json().admin;
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('a');
    this.admin.emit(null);
  }

  envia_esqueciSenha(form: NgForm){
    const body = {
      email: form.value.email
    };
    let resp: string = '';
    return this._http.put(this._url + 'admin/envia_esqueciSenha', body, {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
                     .map(
                        response => {
                          //resp = response.json().retorno;
                          return response;
                        }
                     );
  }

  
}
