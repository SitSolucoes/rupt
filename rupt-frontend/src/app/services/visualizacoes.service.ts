import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class VisualizacoesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  create(post_id, leitor_id){
    const body = JSON.stringify({
        post_id: post_id,
        leitor_id: leitor_id
    });

    return this._http.post(this._url + 'visualizacoes/create', body, {headers: this.headers}).map(
      (response: Response)=>{
          return response.json().id;
    });
  }

}
