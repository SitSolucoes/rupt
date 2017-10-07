import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';

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
    return this._http.get(this._url + 'categoria/getCategorias').map(
      (response: Response) => {
        return response.json().categorias;
      }
    )
  };

  getCategoriasAtivas(): Observable<any>{
    return this._http.get(this._url + 'categoria/getCategoriasAtivas').map(
      (response: Response) => {
        return response.json().categorias;
      }
    )
  }

  getSubCategorias(id): Observable<any>{
    return this._http.get(this._url + 'categoria/getSubCategorias/'+id).map(
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

}
