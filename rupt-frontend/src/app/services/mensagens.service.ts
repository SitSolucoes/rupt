import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class MensagensService {

    private _url: string = 
    'http://localhost:8000/api/'; //DEV
    //'http://api.sitsolucoes.com.br/api/';  //TESTE

  constructor(private _http: Http) { }

  getMensagens_nLidas(): Observable<any>{
     return this._http.get(this._url + 'getMensagens/naoLidas')
      .map(
        (response: Response) => {
          return response.json().mensagens;
        }
      );
  }

  countMensagens_nLidas(): Observable<any>{
    return this._http.get(this._url + 'getCountMensagens_nLidas')
      .map(
        (response: Response) => {
          return response.json().quantidade;
        }
      );
  }

}
