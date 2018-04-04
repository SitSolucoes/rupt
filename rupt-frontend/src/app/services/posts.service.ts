import { Observable } from 'rxjs';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Post } from 'app/classes/post';

@Injectable()
export class PostsService {

  private _url: string = ConnectionFactory.API_CONNECTION;
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private _http: Http) { }

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
    return this._http.get(this._url + 'posts/getSliderPosts', {headers: this.headers}).map(
        ( response ) => { return response.json().posts }
    )
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
    return this._http.get(this._url + 'posts/PostsToHome', {headers: this.headers}).map(
      ( response ) => { return response.json().categorias }
    )
  }

  getHomeLogado(leitor_id){
    return this._http.post(this._url + 'posts/getHomeLogado', JSON.stringify({leitor_id: leitor_id}), {headers: this.headers}).map(
      ( response ) => { return response.json().categorias }
    )
  }

  getPost(id):Observable<any>{
      return this._http.get(this._url + 'posts/Post/'+id, {headers: this.headers}).map(
        (retorno: Response) => {
          return retorno.json().post
      }); 
  }

  getPostsByLink(link, leitor_id):Observable<any>{
      const body = JSON.stringify({
          link: link,
          leitor_id: leitor_id
      })

      return this._http.post(this._url + 'posts/getPostByLink', body, {headers: this.headers}).map(
          ( response ) => { return response.json().post }
      )
  }

  create(form){
    return this._http.post(this._url + 'posts/create', JSON.stringify(form.value), {headers: this.headers}).map(
      (response) => { return response.json().post }
    )
  }

  publicar(id){
      return this._http.post(this._url + 'posts/publicar', JSON.stringify({id: id}), {headers: this.headers}).map(
        (response) => { return response.json() }
      )
  }

  delete(id){
    return this._http.post(this._url + 'posts/delete', JSON.stringify({id: id}), {headers: this.headers}).map(
      (response) => { return response.json().msg }
    )
  }

  update(form){
    return this._http.post(this._url + 'posts/update', JSON.stringify(form.value), {headers: this.headers}).map(
      (response) => { return response.json().post }
    )
  }

  getRascunhos(leitor_id){
      return this._http.post(this._url + 'posts/getRascunhos', JSON.stringify({leitor_id: leitor_id}), {headers: this.headers}).map(
        (retorno: Response) => {
          return retorno.json().rascunhos;
      });
  }

  getPostsByCategoria(categoria_id){
      return this._http.get(this._url + 'posts/getPostsByCategoria/'+categoria_id, {headers: this.headers}).map(
          (response) => { return response.json().posts }
      )
  }

  pesquisaUltimos(search){
    return this._http.post(this._url + 'posts/pesquisaUltimos', JSON.stringify({search: search}), { headers: this.headers}).map(
      ( response: Response) => { return response.json().posts }
    )
  }

  pesquisaDestaques(search){
    return this._http.post(this._url + 'posts/pesquisaDestaques', JSON.stringify({search: search}), {headers: this.headers}).map(
      ( response: Response ) => { return response.json().posts }
    )
  }
}
