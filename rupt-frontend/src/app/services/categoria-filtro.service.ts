import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaFiltroService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  save(categoriasFiltro, count){
      const body = ({
          categoriasFiltro: categoriasFiltro,
          count: count
      });

      return this._http.post(this._url + 'categoriaFiltro/save', body, {headers: this.headers}).map(
        (response) => { }
      )
  }

  getCategoriasFiltro(): Observable<any>{
    return this._http.get(this._url + 'categoriaFiltro/getCategoriasFiltro').map(
      (response: Response) => {
        return response.json().categoriasFiltro;
      }
    )
  };

}
