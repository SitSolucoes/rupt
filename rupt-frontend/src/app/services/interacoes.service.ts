import { Interacoes } from './../interacoes';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class InteracoesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  getAll(post_id, categoria):Observable<any>{
      return this._http.get(this._url + 'interacoes/getAll/'+post_id+'/'+categoria, {headers: this.headers}).map(
        (response) => {
           return response.json().interacoes;
        }
      )
  }

}
