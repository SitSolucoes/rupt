import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class PostsService {

  constructor(private _http: Http) { }

  private _url: string = ConnectionFactory.API_CONNECTION;

  getEscritor(id){
    
    return this._http.get(this._url + 'getEscritor/' + id)
      .map(
          (response: Response) => { 
            return {
              'escritor': response.json().escritor[0],
              'leitor': response.json().leitor[0]
            } 
          }
        );
  }

  getSliderPosts(){
    return this._http.get(this._url + 'posts/getSliderPosts')
      .map((retorno: Response) => {
        return{
          'posts': retorno.json().posts
        };
      }); 
  }

  getCategoryPostsSlider(){
    return this._http.get(this._url + 'posts/PostsToHome/')
      .map((retorno: Response) => {
        return{
          'posts': retorno.json().retorno
        };
      }); 
  }

  getPost(id){
    return this._http.get(this._url + 'posts/Post/'+id)
    .map((retorno: Response) => {
      return{
        'dados': retorno.json().retorno
      };
    }); 
  }

}
