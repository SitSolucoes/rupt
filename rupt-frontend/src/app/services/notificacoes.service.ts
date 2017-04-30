import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class NotificacoesService {

  notificacoes = [{"escritores":0},{"mensagens":0},{"denuncias":0},{"categorias":0}];
  
  constructor(private _http: Http) { }

  getNotificacoes(){
    this.notificacoes["escritores"] = 2;
    this.notificacoes["mensagens"] = 0;
    this.notificacoes["denuncias"]  = 8;
    this.notificacoes["categorias"] = 1;

    return this.notificacoes;
  }

}
