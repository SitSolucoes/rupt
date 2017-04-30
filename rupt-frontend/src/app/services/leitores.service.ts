import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class LeitoresService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = 'http://localhost:8000/api/';
  constructor(private _http: Http) { }

  private createBody(form){
    return JSON.stringify(
        {
         nome: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         sexo: form.value.sexo,
         src_foto: form.value.src_foto,
         password: form.value.senha
        });
  }
  
  createLeitor(form){
    const body = this.createBody(form);
    
    return this._http.post(this._url + 'storeLeitor', body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  } 

  updateLeitor(form, id){
    const body = this.createBody(form);
    
    return this._http.put(this._url + 'updateLeitor/'+id, body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
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
}