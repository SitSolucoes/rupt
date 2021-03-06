import { Base64 } from './../shared/Base64';
import { ConnectionFactory } from './../classes/connection-factory';
import { Observable } from 'rxjs';
import { Http, Response, Headers} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EscritoresService {
  private base64: Base64 = new Base64();
  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  constructor(private _http: Http) { }

  getEscritores(): Observable<any>{
      return this._http.get(this._url + 'getEscritores').map(
        (response: Response) => {
          return response.json().escritores;
        }
      )
  }

  getEscritor(id): Observable<any>{
    return this._http.get(this._url + 'getEscritor/'+id).map(
      (escritor: Response) => {
        return escritor.json().escritor;
      }
    )
  }

  countSolicitacoes(): Observable<any>{
    return this._http.get(this._url + 'countSolicitacoes').map(
      (response: Response) => {
        return response.json().countSolicitacoes;
      }
    )
  }

  getSolicitacoes(): Observable<any>{
      return this._http.get(this._url + 'getSolicitacoes').map(
        (response: Response) => {
          return response.json().solicitacoes;
        }
      )
  }

  private createBody(form){
    return JSON.stringify(form.value);
  }

  createEscritor(form, id, admin){
    const body = this.createBody(form);

    let admin_id = this.base64.decode(localStorage.getItem('a'));
    if (!admin)
      admin_id = '0';
    
    return this._http.put(this._url + 'createEscritor/' + id + "/" + admin_id, body, {headers: this.headers}).map(
    (response: Response)=>{
      return response.json().leitor_idLeitor;
    });
  }

  updateEscritor(form, id){
    const body = this.createBody(form);

    return this._http.put(this._url + 'updateEscritor/'+id, body, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

  recusarEscritor(motivo, id){
    const motivo_recusa = JSON.stringify({motivo_recusa: motivo});

    return this._http.put(this._url + 'recusarEscritor/'+id, motivo_recusa, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

  aceitarEscritor(id){
    let admin_id = this.base64.decode(localStorage.getItem('a'));

    return this._http.put(this._url + 'aceitarEscritor/'+ id + '/' + admin_id, {headers: this.headers}).map(
    (response: Response)=>{
      response.json()
    });
  }

  existEmail(email): Observable<any>{
      return this._http.get(this._url + 'existEmail/'+email).map(
        (response: Response) => {
          return response.json().idLeitor;
        }
      )
  }

  existNick(nick): Observable<any>{
      return this._http.get(this._url + 'existNick/'+nick).map(
        (response: Response) => {
          return response.json().idLeitor;
        }
      )
  }

  existCpf(cpf, id): Observable<any>{
    return this._http.get(this._url + 'existCpf/'+cpf+"/"+id).map(
      (response: Response) => {
        return response.json().existCpf;
      }
    )
  }

}
