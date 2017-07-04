import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class SugestoesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  constructor(private _http: Http) { }

  getSugestoes(): Observable<any>{
     return this._http.get(this._url + 'sugestao/getSugestoes')
      .map(
        (response: Response) => {
          return response.json().sugestoes;
        }
      );
  }

  countSugestoes(): Observable<any>{
    return this._http.get(this._url + 'sugestao/countSugestoes').map(
      (response: Response) => {
        return response.json().countSugestoes;
      }
    )
  }

  alteraStatus(id, status): Observable<any>{
    return this._http.put(this._url + 'sugestao/alteraStatus/'+id+'/'+status, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

}
