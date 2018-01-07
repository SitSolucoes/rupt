import { Interacoes } from './../interacoes';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Http, Response, Headers } from '@angular/http';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';

@Injectable()
export class InteracoesLeitorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  
  constructor(private _http: Http) { }

  interage(interacaoLeitor: InteracaoLeitor):Observable<any>{
      return this._http.post(this._url + 'interacaoLeitor/interage', JSON.stringify(interacaoLeitor), {headers: this.headers}).map(
        (response) => { 
            return response.json();
        }
      )
  }

  getInteracaoLeitor(post_id, leitor_id){
      return this._http.get(this._url + 'interacaoLeitor/getInteracoesLeitorPost/'+post_id+'/'+leitor_id, {headers: this.headers}).map(
        (response) => { return response.json().interacoesLeitor }
      )
  }

}
