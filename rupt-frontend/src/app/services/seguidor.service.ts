import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';
import { Seguidor } from 'app/classes/seguidor';

@Injectable()
export class SeguidorService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private _url: string = ConnectionFactory.API_CONNECTION;

    constructor(private _http: Http) { }

    follow(seguidor: Seguidor){
        return this._http.post(this._url + 'seguidor/follow', JSON.stringify(seguidor), {headers: this.headers}).map(
            ( response ) => { 
                return response.json().follow;
            }
        )
    }

    unfollow(seguidor: Seguidor){
        return this._http.post(this._url + 'seguidor/unfollow', JSON.stringify(seguidor), {headers: this.headers}).map(
            ( response ) => {
                return response.json().follow;
            }
        )
    }

    verify(seguidor: Seguidor):Observable<any>{
        return this._http.post(this._url + 'seguidor/verify', JSON.stringify(seguidor), {headers: this.headers}).map(
            ( response ) => {
                return response.json().follow;
            }
        )
    }

    seguindo(id){
        return this._http.get(this._url + 'seguidor/seguindo/'+id, {headers: this.headers}).map(
            ( response ) => { return response.json().seguindo }
        )
    }

    seguidores(id){
        return this._http.get(this._url + 'seguidor/seguidores/' + id, {headers: this.headers}).map(
            ( response ) => { return response.json().seguidores }
        )
    }
    
}
