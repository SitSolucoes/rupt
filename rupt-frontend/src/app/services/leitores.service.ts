import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class LeitoresService {

  private _url: string = 'http://localhost:8000/api/';
  constructor(private _http: Http) { }

  createLeitor(form){
    console.log(form);

    const body = JSON.stringify(
        {nome: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         sexo: form.value.sexo,
         src_foto: form.value.src_foto,
         password: form.value.senha
        }
    );

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this._url + 'storeLeitor', body, {headers: headers}).map(
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
