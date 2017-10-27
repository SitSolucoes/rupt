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

  createComentario(id){
    return this._http.post(this._url + 'posts/postCreateComentario', {headers: this.headers})
    .map(
        (response: Response) => { 
          console.log(response);
          return {
            'sucesso': response.json().sucesso,
            'comentarios': response.json().comentarios[0]
          };
        }
      );
  }
  
  getComentarios(id){
    return this._http.get(this._url + 'posts/getComentarios' + id, {headers: this.headers})
    .map(
        (response: Response) => { 
          return {
            'comentarios': response.json().comentarios[0]
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
