import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Http, Response, Headers } from '@angular/http';
import { Notificacao } from '../classes/notificacao';

@Injectable()
export class NotificacaoService {
	
	private headers = new Headers({'Content-Type': 'application/json'});
	private _url: string = ConnectionFactory.API_CONNECTION;

	constructor(private _http: Http) { }

	create(notificacao: Notificacao){
		return this._http.post(this._url + 'notificacao/create', JSON.stringify(notificacao), {headers: this.headers}).map(
			( response ) => { return true }
		)
	}

	markAsRead(escritor_id){
		const body = { escritor_id: escritor_id };

		return this._http.post(this._url + 'notificacao/markAsRead', JSON.stringify(body), {headers: this.headers}).map(
			( response ) => { return response.json().notificacoes }
		)
	}

	getNotificacoes(escritor_id){
		const body = { escritor_id: escritor_id };

		return this._http.post(this._url + 'notificacao/getNotificacoes', JSON.stringify(body), {headers: this.headers}).map(
			( response ) => { return response.json().notificacoes }
		)
	}

}
