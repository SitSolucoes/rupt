import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Post } from './../classes/post';

@Injectable()
export class DenunciasService {

  private _url: string = ConnectionFactory.API_CONNECTION;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http: Http) { }

  getDenuncias(){
    return this._http.get(this._url + 'getDenuncias')
      .map(
        (response: Response) => {
          return response.json().denuncias;
        }
      );
  }
  
  getMotivosDenuncia(){
    return this._http.get(this._url + 'posts/getMotivosDenuncia')
    .map((retorno: Response) => {
      return{
        'motivos': retorno.json().motivos
      };
    });
  }

  agir(f, a){
    const body = JSON.stringify({
      post_idPost: f.value.post_idPost,
      leitor_idLeitor: f.value.leitor_idLeitor,
      idAdmin_Deleted: f.value.idAdminDeleted,
      motivo_idMotivo: f.value.motivo_idMotivo,
      deleted_at: f.value.deleted_at,
      action: a
    })
    return this._http.put(this._url + 'denuncias/agir/',body,{headers: this.headers}).map(
      (ret) => {
        return {
          status: ret.json().status
        }
      }
    );
  }
  getDetalhes(d){
    return this._http.get(this._url + 'denuncias/getDetalhes/'+d.id)
    .map((ret)=>{
      return{
        'denuncia': ret.json().denuncia
      }
    });
  }

  create(motivo_idMotivo, post_idPost, leitor_idLeitor){
    const body = JSON.stringify({
      motivo_idMotivo: motivo_idMotivo,
      post_idPost: post_idPost,
      leitor_idLeitor: leitor_idLeitor
    });
    
    return this._http.post(this._url + 'posts/denuncia', body, {headers: this.headers}).map(
    (response: Response)=>{
        return response.json();
    },
    (error) => {
      return error.json();
    });
  }
  private createBody(form){
    return JSON.stringify(
        {
         mensagem: form.value.conteudo,
         email: form.value.email,
         assunto: form.value.assunto,
         nome: form.value.nome,
         leitorId: form.value.leitorId
        });
  }
  
  getPost(id){
    return this._http.get(this._url + 'getPost/' + id)
      .map(
          (response: Response) => { 
            return response.json().post[0];
          }
        );
  }

  getLeitor(id){
    return this._http.get(this._url + 'getLeitor/' + id)
      .map(
          (response: Response) => { 
            return response.json().leitor[0];
          }
        );
  }

  getMotivo(id){
    return this._http.get(this._url + 'getMotivo/' + id)
      .map(
          (response: Response) => { 
            return response.json().motivo[0];
          }
        );
  }


}
