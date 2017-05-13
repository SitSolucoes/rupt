import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Post } from './../classes/post';

@Injectable()
export class DenunciasService {

  private _url: string = 
    'http://localhost:8000/api/'; //DEV
    //'http://api.sitsolucoes.com.br/api/';  //TESTE

  constructor(private _http: Http) { }

  getDenuncias(){
    return this._http.get(this._url + 'getDenuncias')
      .map(
        (response: Response) => {
          return response.json().denuncias;
        }
      );
  }

  getPost(id){
    return this._http.get(this._url + 'getPost/' + id)
      .map(
          (response: Response) => { 
            return response.json().post[0];
          }
        );
  }

  getLeitor(id){
    return this._http.get(this._url + 'getLeitor/' + id)
      .map(
          (response: Response) => { 
            return response.json().leitor[0];
          }
        );
  }

  getMotivo(id){
    return this._http.get(this._url + 'getMotivo/' + id)
      .map(
          (response: Response) => { 
            return response.json().motivo[0];
          }
        );
  }


}
