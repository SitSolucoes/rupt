import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Admin } from './admin';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AdministradoresService {
  private _url: string = 'http://localhost:8000/api/';
  constructor(private _http: Http) { }

  createAdmin(){

  }

  getAdmins(): Observable<any>{
     return this._http.get(this._url + 'getAdmins')
      .map(
        (response: Response) => {
          return response.json().admins;
        }
      );
  }

  getAdmin(id: number): Observable<any>{
     return this._http.get(this._url + 'getAdmin')
      .map(
        (response: Response) => {
          return response.json().admin;
        }
      );
  }

}
