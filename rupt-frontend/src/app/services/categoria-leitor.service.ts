import { CategoriaLeitor } from './../classes/categoria-leitor';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaLeitorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  create(categoriasLeitor, leitor_id){
    const body = JSON.stringify({
      leitor_id: leitor_id,
      categoriasLeitor: categoriasLeitor
    });

    return this._http.post(this._url + 'categoriaLeitor/create', body, {headers: this.headers}).map(
      (response) => { response.json }
    )
  }

}
