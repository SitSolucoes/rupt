import { Interacoes } from './../interacoes';
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
    return JSON.stringify(form.value);
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

  getMaisLidas():Observable<any>{
    return this._http.get(this._url + 'posts/getPostsMaisLidos', {headers: this.headers})
    .map((retorno: Response) => {
      return{
        'posts': retorno.json().posts
      };
    });
  }

  getCategoryPostsSlider(){
    return this._http.get(this._url + 'posts/PostsToHome', {headers: this.headers})
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

  delete(id){
    return this._http.post(this._url + 'posts/delete', JSON.stringify({id: id}), {headers: this.headers}).map(
      (response) => { return response.json().msg }
    )
  }

}
