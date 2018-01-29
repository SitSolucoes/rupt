import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';
import { Seguir } from 'app/classes/seguir';

@Injectable()
export class SeguirService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private _url: string = ConnectionFactory.API_CONNECTION;

    constructor(private _http: Http) { }

    follow(seguir: Seguir){
        return this._http.post(this._url + 'seguir/follow', JSON.stringify(seguir), {headers: this.headers}).map(
            ( response ) => { 
                return response.json();
            }
        )
    }

    unfollow(seguir: Seguir){
        return this._http.post(this._url + 'seguir/unfollow', JSON.stringify(seguir), {headers: this.headers}).map(
            ( response ) => {
                return response.json();
            }
        )
    }

    verify(seguir: Seguir):Observable<any>{
        return this._http.post(this._url + 'seguir/verify', JSON.stringify(seguir), {headers: this.headers}).map(
            ( response ) => {
                return response.json().follow;
            }
        )
    }

}
