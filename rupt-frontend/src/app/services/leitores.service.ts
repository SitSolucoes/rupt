import { Base64 } from './../shared/Base64';
import { ConnectionFactory } from './../classes/connection-factory';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import { Leitor } from 'app/classes/leitor';

@Injectable()
export class LeitoresService {
  base64: Base64 = new Base64();
  leitor = new EventEmitter<Leitor>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private _url: string = ConnectionFactory.API_CONNECTION;
  constructor(private _http: Http) { }

  private createBody(form){
    return JSON.stringify(
        {
         uid: form.value.uid,
         nome: form.value.nome,
         nick: form.value.nick,
         email: form.value.email,
         nascimento: form.value.nascimento,
         biografia: form.value.biografia,
         sexo: form.value.sexo,
         src_foto: form.value.src_foto != null && form.value.src_foto != '' ? form.value.src_foto : '',
         ativo: form.value.ativo,
         fb_login: form.value.fb_login,
         google_login: form.value.google_login,
         token: form.value.token,
         password: form.value.password
        }
    );
  }
  
  createLeitor(form){
    const body = this.createBody(form);
    return this._http.post(this._url + 'storeLeitor', body, {headers: this.headers}).map(
    (response: Response)=>{
        return response.json().id;
    });
  } 

  checkFBToken(token, uid){
    return this._http.get(this._url + 'checkFbToken/' + token + '/' + uid)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  checkGoogleToken(token, uid){
    return this._http.get(this._url + 'checkGoogleToken/' + token + '/' + uid)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  validaToken(token){
    return this._http.get(this._url + 'leitor/validaToken/'+token).map(
      (response)=> {
        return response.json();
      }
    )
  }

  redefineSenha(f){
    const body = JSON.stringify({
      email: f.value.email,
      senha: f.value.novaSenha
    })

    //console.log(f.value.email);
    
    return this._http.put(this._url + 'leitor/redefineSenha', body, {headers: this.headers}).map(
      (response)=>{
        return response.json().resultado;
      }
    )
  }

  updateLeitor(form, id){
    const body = this.createBody(form);
    
    return this._http.put(this._url + 'updateLeitor/'+id, body, {headers: this.headers}).map(
    (response: Response)=>{
      this.leitor.emit(response.json().leitor);
      return response.json().message;
    });
  }  

  esqueciSenha(f){
    const body = JSON.stringify({
      email: f.value.email
    });

    return this._http.post(this._url + 'esqueciSenhaLeitor', body, {headers: this.headers}).map(
      (r) => {
        return r.json();
      }
    );
  }

  getLeitores(): Observable<any>{
     return this._http.get(this._url + 'getLeitores')
      .map(
        (response: Response) => {
          return response.json().leitores;
        }
      );
  }

  getLeitor(id): Observable<any>{
     return this._http.get(this._url + 'getLeitor/' + id)
      .map(
        (response: Response) => {
          return response.json().leitor;
        }
      );
  }

  getLeitorByNick(nick): Observable<any>{
    return this._http.get(this._url + 'leitor/getLeitorByNick/' + nick).map(
      (response: Response) => { return response.json().leitor }
    )
  }

  validaNick(nick, id){
    return this._http.get(this._url + 'validaNick/' + nick + "/" + id).map(
      (response: Response) => {
        return response.json().nick;
      }
    )
  }

  validaEmail(email, id){
    return this._http.get(this._url + 'validaEmailLeitor/'+ email + "/" + id).map(
      (response: Response) => {
        return response.json().email;
      }
    )
  }

  doLogin(form){
    const body = JSON.stringify(form.value);
    return this._http.put(this._url + 'leitor/signin', body, {headers: this.headers}).map(
        (response: Response) => { 
          if (response.json().login == true){
            localStorage.setItem('l', this.base64.encode(response.json().leitor.id));
            localStorage.setItem('token', response.json().token);
  
            this.leitor.emit(response.json().leitor);
            
            return [true, response.json().leitor];
          }
          else {
            return [false, response.json().login];
          }
        }
      );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('l');
    this.leitor.emit(new Leitor); //tem que ser assim por causa do modal das categorias
  }

  verificaLogin(){
    let token = localStorage.getItem("token");
    let id = this.base64.decode(localStorage.getItem("l"));
    
    const body = JSON.stringify({
      id: id,
      token: token
    })

    return this._http.post(this._url + 'leitor/verificaLogin', body, {headers: this.headers}).map(
      (response: Response) => {
        if (response.json().leitor != false){
          this.leitor.emit(response.json().leitor);
            
          return true;
        }

        localStorage.removeItem('l');
        return response.json().leitor;
      }
    )
  }

  pesquisaLeitor(search){
      return this._http.post(this._url + 'leitor/pesquisa', JSON.stringify({search: search}), { headers: this.headers}).map(
        ( response: Response) => { return response.json().leitores }
      )
  }
}
