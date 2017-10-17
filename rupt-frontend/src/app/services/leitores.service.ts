import { Base64 } from './../shared/Base64';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { Leitor } from 'app/classes/leitor';

@Injectable()
export class LeitoresService {
  base64: Base64 = new Base64();
  leitor = new EventEmitter<Leitor>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  constructor(private _http: Http) { }

  private createBody(form){
    return JSON.stringify(
        {
         nome: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         biografia: form.value.biografia,
         sexo: form.value.sexo,
         ativo: form.value.ativo,
         password: form.value.senha
      });
  }
  
  createLeitor(form){
    const body = this.createBody(form);
    
    return this._http.post(this._url + 'storeLeitor', body, {headers: this.headers}).map(
    (response: Response)=>{
        return response.json().id;
    });
  } 

  updateLeitor(form, id){
    const body = this.createBody(form);
    
    return this._http.put(this._url + 'updateLeitor/'+id, body, {headers: this.headers}).map(
    (response: Response)=>{
      this.leitor.emit(response.json().leitor);
      return response.json().message;
    });
  }  

  getLeitores(): Observable<any>{
     return this._http.get(this._url + 'getLeitores')
      .map(
        (response: Response) => {
          return response.json().leitores;
        }
      );
  }

  getLeitor(id): Observable<any>{
     return this._http.get(this._url + 'getLeitor/' + id)
      .map(
        (response: Response) => {
          return response.json().leitor;
        }
      );
  }


  validaNick(nick, id){
    return this._http.get(this._url + 'validaNick/' + nick + "/" + id).map(
      (response: Response) => {
        return response.json().nick;
      }
    )
  }

  validaEmail(email, id){
    return this._http.get(this._url + 'validaEmailLeitor/'+ email + "/" + id).map(
      (response: Response) => {
        return response.json().email;
      }
    )
  }

  doLogin(form){
    const body = JSON.stringify(form.value);

    return this._http.put(this._url + 'leitor/signin', body, {headers: this.headers}).map(
      (response: Response) => { 
        if (response.json().login == true){
          localStorage.setItem('l', this.base64.encode(response.json().leitor.id));
          localStorage.setItem('token', response.json().token);

          this.leitor.emit(response.json().leitor);
          
          return [true, response.json().leitor];
        }
        else {
          return [false, response.json().login];
        }
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('l');
    this.leitor.emit(null);
  }

  verificaLogin(){
    let token = localStorage.getItem("token");
    let id = this.base64.decode(localStorage.getItem("l"));
    
    const body = JSON.stringify({
      id: id,
      token: token
    })

    return this._http.post(this._url + 'leitor/verificaLogin', body, {headers: this.headers}).map(
      (response: Response) => {
        if (response.json().leitor != false){
          this.leitor.emit(response.json().leitor);
            
          return true;
        }

        return response.json().leitor;
      }
    )
  }
}
