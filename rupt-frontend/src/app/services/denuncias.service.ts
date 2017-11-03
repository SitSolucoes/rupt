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
