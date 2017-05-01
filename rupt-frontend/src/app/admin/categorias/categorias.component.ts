import { Component, OnInit } from '@angular/core';

import { NotificacoesService } from './../../services/notificacoes.service';
import { SugestoesService } from './../../services/sugestoes.service';
import { Sugestao } from './../../classes/sugestao';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  notificacoes;
  sugestoes;

  constructor(
    private _notificacoesService: NotificacoesService,
    private _sugestoesService: SugestoesService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getListSugestoes();
  }

  getListSugestoes(){
    this._sugestoesService.getSugestoes().subscribe(
      (sugestoes: Sugestao[]) => {this.sugestoes = sugestoes;}
    );
  }

  getSugestoes(){
    return this.sugestoes;
  }

}
