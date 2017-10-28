import { Observable } from 'rxjs';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class PostsService {

  constructor(private _http: Http) { }

  private _url: string = ConnectionFactory.API_CONNECTION;
  private headers = new Headers({'Content-Type': 'application/json'});

  getEscritor(id){
    
    return this._http.get(this._url + 'getEscritor/' + id, {headers: this.headers})
      .map(
          (response: Response) => { 
            return {
              'escritor': response.json().escritor[0],
              'leitor': response.json().leitor[0]
            } 
          }
        );
  }

  private createBody(form){
    return JSON.stringify(
        {
         comentario: form.value.comentario,
         comentario_idComentario: form.value.comentario_idComentario,
         post_idPost: form.value.post_idPost,
         leitor_idLeitor: form.value.leitor_idLeitor,
      });
  }

  createComentario(f){
    const body = this.createBody(f);
    return this._http.post(this._url + 'posts/postCreateComentario', body, {headers: this.headers})
    .map(
        (response: Response) => { 
          //console.log(response);
          return {
            'sucesso': response.json().status,
            'comentarios': response.json().comentarios
          };
        }
      );
  }
  
  getComentarios(id){
    return this._http.get(this._url + 'posts/getComentarios/' + id, {headers: this.headers})
    .map(
        (response: Response) => { 
          return {
            'comentarios': response.json().comentarios
          }; 
        }
    );
  }

  getSliderPosts(){
    return this._http.get(this._url + 'posts/getSliderPosts', {headers: this.headers})
      .map((retorno: Response) => {
        return{
          'posts': retorno.json().posts
        };
      }); 
  }

  getInteracoes(id){
    return this._http.get(this._url + 'posts/getInteracoesFromPost/' + id, {headers: this.headers})
      .map((response: Response) => {
        return {
          'likes' : response.json().interacoes.likes,
          'dislikes' : response.json().interacoes.dislikes,
          'shares' : response.json().interacoes.shares,
          'status': response.json().status,
          'message': response.json().message
        };
      }); 
  }

  createBodyInteracao(post_id, comentario, leitor, alvo, tipo){
    return JSON.stringify(
      {
       post_idPost: post_id,
       leitor_idLeitor: leitor.id,
       comentario_idComentario: comentario,
       alvo: alvo,
       tipo: tipo
    });
  }

  interage(post_id, comentario, leitor, alvo, tipo){
    const body = this.createBodyInteracao(post_id, comentario, leitor, alvo, tipo);
    return this._http.post(this._url + 'posts/postInterage', body, {headers: this.headers})
    .map(
        (response: Response) => { 
          return {
            'likes' : response.json().interacoes.likes,
            'dislikes' : response.json().interacoes.dislikes,
            'shares' : response.json().interacoes.shares,
            'status': response.json().status,
            'message': response.json().message
          };
        } 
      );
  }


  getMaisLidas():Observable<any>{
    return this._http.get(this._url + 'posts/getPostsMaisLidos', {headers: this.headers})
    .map((retorno: Response) => {
      return{
        'posts': retorno.json().posts
      };
    });
  }

  getCategoryPostsSlider(){
    return this._http.get(this._url + 'posts/PostsToHome/', {headers: this.headers})
      .map((retorno: Response) => {
        return{
          'posts': retorno.json().retorno
        };
      }); 
  }

  getPost(id):Observable<any>{
    return this._http.get(this._url + 'posts/Post/'+id, {headers: this.headers}).map(
      (retorno: Response) => {
        return retorno.json().post
    }); 
  }

  create(form){
    return this._http.post(this._url + 'posts/create', JSON.stringify(form.value), {headers: this.headers}).map(
      (response) => { return response.json().post_id }
    )
  }

}
