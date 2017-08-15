import { Sugestao } from './../classes/sugestao';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class PagamentoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  countPagamentosPendentes(): Observable<any>{
    return this._http.get(this._url + 'pagamento/countPagamentosPendentes').map(
      (response: Response) => {return response.json().countPagamentos}
    )
  }

  getPagamentosPendentes(): Observable<any>{
    return this._http.get(this._url + 'pagamento/getPagamentosPendentes')
    .map(
      (response: Response) => {
        return response.json().pagamentos;
      }
    );
  }

  getPagamentos(): Observable<any>{
    return this._http.get(this._url + 'pagamento/getPagamentos')
    .map(
      (response: Response) => {
        return response.json().pagamentos;
      }
    );
  }

  update(form){
    const body = JSON.stringify({
      admin_idAdmin: localStorage.getItem("admin_id"),
      id: form.value.id,	
      data_pagamento: form.value.data_pagamento,
    });

    return this._http.post(this._url + 'pagamento/update', body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

}
