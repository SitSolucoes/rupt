import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class PostsService {

  constructor(private _http: Http) { }

  private _url: string = 
    'http://localhost:8000/api/'; //DEV
    //'http://api.sitsolucoes.com.br/api/';  //TESTE

  getEscritor(id){
    return this._http.get(this._url + 'getEscritor/' + id)
      .map(
          (response: Response) => { 
            return response.json().post;
          }
        );
  }

}
