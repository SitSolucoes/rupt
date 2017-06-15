import { ConnectionFactory } from './../classes/connection-factory';
import { Observable } from 'rxjs';
import { Http, Response, Headers} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EscritoresService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
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

  private createBody(form){
    return JSON.stringify(
        {
         nome: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         sexo: form.value.sexo,
         ativo: form.value.ativo,
         src_foto: form.value.src_foto,
         password: form.value.senha,
         rg: form.value.rg,
         cpf: form.value.cpf,
         telefone: form.value.telefone,
         celular: form.value.celular,
         biografia: form.value.biografia,
         banco: form.value.banco,
         agencia: form.value.agencia,
         conta_corrente: form.value.contaCorrente,
         status: form.value.status,
      });
  }

  updateEscritor(form, id){
    const body = this.createBody(form);
    
    return this._http.put(this._url + 'updateEscritor/'+id, body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

  recusarEscritor(motivo, id){
    const motivo_recusa = JSON.stringify({motivo_recusa: motivo});

    return this._http.put(this._url + 'recusarEscritor/'+id, motivo_recusa, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

}
