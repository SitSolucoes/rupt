import { EscritoresService } from './escritores.service';
import { SugestoesService } from './sugestoes.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class NotificacoesService {

  notificacoes = [{"escritores":0},{"mensagens":0},{"denuncias":0},{"categorias":0}];
  //private _notificacoesService: NotificacoesService
  constructor(
    private _http: Http, 
    private _sugestoesService: SugestoesService,
    private _escritoresService: EscritoresService
  ) { }
  
  private _url: string =  
    'http://localhost:8000/api/'; //DEV
    //'http://api.sitsolucoes.com.br/api/';  //TESTE

  getNotificacoes(){
    this._sugestoesService.countSugestoes().subscribe(
      (countSugestoes: number) => {this.notificacoes["categorias"] = countSugestoes}
    );

    this._escritoresService.countSolicitacoes().subscribe(
      (countSolicitacoes: number) => {this.notificacoes["escritores"] = countSolicitacoes}
    );

    this.notificacoes["mensagens"] = 0;
    this.notificacoes["denuncias"]  = 8;
     
    return this.notificacoes;
  }

}
