import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EscritoresService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = 
    'http://localhost:8000/api/'; //DEV
    //'http://api.sitsolucoes.com.br/api/';  //TESTE
  constructor(private _http: Http) { }

  getEscritores(): Observable<any>{
      return this._http.get(this._url + 'getEscritores').map(
        (response: Response) => {
          return response.json().escritores;
        }
      )
  }

  countSolicitacoes(): Observable<any>{
    return this._http.get(this._url + 'countSolicitacoes').map(
      (response: Response) => {
        return response.json().countSolicitacoes;
      }
    )
  }

  getSolicitacoes(): Observable<any>{
      return this._http.get(this._url + 'getSolicitacoes').map(
        (response: Response) => {
          return response.json().solicitacoes;
        }
      )
  }

}
