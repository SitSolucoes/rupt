import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class LeitoresService {

  private _url: string = 'http://localhost:8000/api/';
  constructor(private _http: Http) { }

  createLeitor(form){
    //const token = this.authService.getToken();
    const body = JSON.stringify(
        {name: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         sexo: form.value.nascimento,
         password: form.value.senha
        }
    );

    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(this._url + 'storeLeitor', body, {headers: headers}).map(
    (response: Response)=>{
      response.json()
    });
  } 
}
