import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Categoria } from 'app/classes/categoria';

@Injectable()
export class CategoriasService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  private createBody(form){
    return JSON.stringify(
      {
        categoria: form.value.categoria,
        status: form.value.status
      });
  }

  getCategorias(): Observable<any>{
    return this._http.get(this._url + 'categoria/getCategorias', {headers: this.headers}).map(
      (response: Response) => {
        return response.json().categorias;
      }
    )
  };

  getCategoriasAtivas(): Observable<any>{
    return this._http.get(this._url + 'categoria/getCategoriasAtivas', {headers: this.headers}).map(
      (response: Response) => {
        return response.json().categorias;
      }
    )
  }

  getSubCategorias(id): Observable<any>{
    return this._http.get(this._url + 'categoria/getSubCategorias/'+id, {headers: this.headers}).map(
      (response: Response) => {
        return response.json().subCategorias;
      }
    )
  };

  createCategoria(form){
    const body = this.createBody(form);
    
    return this._http.post(this._url + 'categoria/create', body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

  updateCategoria(form, id){
    const body = this.createBody(form);
    
    return this._http.post(this._url + 'categoria/update/' + id, body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  } 

  createSubCategoria(form, id): Observable<any>{
    const body = this.createBody(form);
    
    return this._http.post(this._url + 'categoria/createSubCategoria/'+id, body, {headers: this.headers}).map(
    (response: Response)=>{
      return response.json().categoria;
    });
  }

  getCategoriaByLink(link){
      return this._http.get(this._url + 'categoria/getCategoriaByLink/' + link, {headers: this.headers}).map(
        (response ) => { return response.json().categoria }
      )
  }

}
