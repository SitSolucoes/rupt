import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, EventEmitter } from '@angular/core';

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
  filtroSugestoes;
  sugestao: Sugestao = new Sugestao();
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalRecusa = new EventEmitter<string|MaterializeAction>();

  constructor(
    private _notificacoesService: NotificacoesService,
    private _sugestoesService: SugestoesService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getListSugestoes();
  }

  getListSugestoes(){
    this._sugestoesService.getSugestoes().subscribe(
      (sugestoes: Sugestao[]) => {this.sugestoes = sugestoes}
    );
  }

  listSugestoes(){
    if ( this.filtroSugestoes === undefined || this.sugestoes.length === 0 || this.filtroSugestoes.trim() === ''){
      return this.sugestoes;
    }
    return this.sugestoes.filter((v) => {
      if (v.categoria.toLowerCase().indexOf(this.filtroSugestoes.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }

  openModalDeleteSugestao(sugestao: Sugestao){
    this.sugestao = sugestao;
    this.modalActions.emit({action:"modalDelete", params:['open']});
  }

  openModalRecusa(sugestao: Sugestao) {
    this.sugestao = sugestao;
    this.modalRecusa.emit({action:"modal",params:['open']});
  }

  closeModalRecusa() {
    this.modalRecusa.emit({action:"modal",params:['close']});
  }

  recusa(){
    this._sugestoesService.alteraStatus(this.sugestao.id, "r").subscribe(
      (respose: any) => {
        this.getListSugestoes();
      }
    )
    this.closeModalRecusa();
  }

}
