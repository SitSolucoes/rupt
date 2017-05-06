import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class NotificacoesService {

  notificacoes = [{"escritores":0},{"mensagens":0},{"denuncias":0},{"categorias":0}];
  
  constructor(private _http: Http) { }
  private _url: string =  
    'http://localhost:8000/api/'; //DEV
    //'http://api.sitsolucoes.com.br/api/';  //TESTE

  getNotificacoes(){
    this.notificacoes["escritores"] = 2;
    this.notificacoes["mensagens"] = 0;
    this.notificacoes["denuncias"]  = 8;
    this.notificacoes["categorias"] = 1;

    return this.notificacoes;
  }

}
