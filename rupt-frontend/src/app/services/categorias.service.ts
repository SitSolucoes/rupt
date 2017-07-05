import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriasService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  getCategorias(): Observable<any>{
    return this._http.get(this._url + 'categoria/getCategorias').map(
      (response: Response) => {
        return response.json().categorias;
      }
    )
  };



}
