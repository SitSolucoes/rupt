import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DenunciasService {

  private _url: string = 'http://localhost:8000/api/';

  constructor(private _http: Http) { }

  getDenuncias(){
    return this._http.get(this._url + 'getDenuncias')
      .map(
        (response: Response) => {
          return response.json().denuncias;
        }
      );
  }

}
