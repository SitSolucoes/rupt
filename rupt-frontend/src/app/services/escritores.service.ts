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
    return JSON.stringify(
        {
         id: form.value.id,
         nome: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         sexo: form.value.sexo,
         ativo: form.value.ativo,
         src_foto: form.value.src_foto,
         password: form.value.senha,
         rg: form.value.rg,
         cpf: form.value.cpf,
         telefone: form.value.telefone,
         celular: form.value.celular,
         biografia: form.value.biografia,
         banco: form.value.banco,
         agencia: form.value.agencia,
         conta_corrente: form.value.conta_corrente,
         status: form.value.status,
         cep: form.value.cep,
         logradouro: form.value.logradouro,
         numero: form.value.numero,
         complemento: form.value.complemento,
         bairro: form.value.bairro,
         cidade: form.value.cidade,
         uf: form.value.uf
      });
  }

  createEscritor(form, id){
    const body = this.createBody(form);

    let admin_id = this.base64.decode(localStorage.getItem('a'));
    if (!admin_id)
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
    return this._http.put(this._url + 'aceitarEscritor/'+ id + '/' + localStorage.getItem('admin_id'), {headers: this.headers}).map(
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
