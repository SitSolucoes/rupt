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

  
  enviaMensagem(f){
    const body = this.createBody(f);
    
    return this._http.post(this._url + 'enviaMensagem', body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }
  
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
    const body =  {
        lida: f.value.lida,
        resposta: f.value.resposta,
        admin: localStorage.getItem('admin_id')
      };

    return this._http.post(this._url + 'respondeMensagem/'+id, body, {headers: this.headers}).map(
        (resultado: Response) => {
          return resultado.json().enviada;
        });
  }

  private createBody(form){
    return JSON.stringify(
        {mensagem: form.value.mensagem,
         email: form.value.email,
         assunto: form.value.assunto,
         nome: form.value.nome,
         leitor_id: form.value.leitor_id
        });
  }
}
