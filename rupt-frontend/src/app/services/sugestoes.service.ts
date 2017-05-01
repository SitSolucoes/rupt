import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()
export class SugestoesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = 'http://localhost:8000/api/';
  constructor(private _http: Http) { }

  getSugestoes(): Observable<any>{
     return this._http.get(this._url + 'getSugestoes')
      .map(
        (response: Response) => {
          return response.json().leitores;
        }
      );
  }

}
