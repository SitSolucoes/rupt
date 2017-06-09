import { ConnectionFactory } from './../classes/connection-factory';
import { identifierName } from '@angular/compiler/compiler';
import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Headers } from '@angular/http';

@Injectable()
export class MensagensService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private _url: string = ConnectionFactory.API_CONNECTION;

  constructor(private _http: Http) { }

  getMensagens_nLidas(): Observable<any>{
     return this._http.get(this._url + 'getMensagens/naoLidas')
      .map(
        (response: Response) => {
          return response.json().mensagens;
        }
      );
  }

  getMensagens_lidas(): Observable<any>{
     return this._http.get(this._url + 'getMensagens/lidas')
      .map(
        (response: Response) => {
          return response.json().mensagens;
        }
      );
  }

  getResposta(id): Observable<any>{
     return this._http.get(this._url + 'getResposta/'+id)
      .map(
        (response: Response) => {
          return response.json().resposta;
        }
      );
  }

  getMensagem(id): Observable<any>{
     return this._http.get(this._url + 'getMensagem/'+id)
      .map(
        (response: Response) => {
          return response.json().mensagem;
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

  enviaResposta(f, id): Observable<any>{
    console.log(f.value.resposta);
    const body =  {
        lida: f.value.lida,
        resposta: f.value.resposta,
        admin: localStorage.getItem('admin_id')
      };

    console.log(body);
    return this._http.post(this._url + 'respondeMensagem/'+id, body, {headers: this.headers}).map(
        (resultado: Response) => {
          return resultado.json().enviada;
        });
  }

}
