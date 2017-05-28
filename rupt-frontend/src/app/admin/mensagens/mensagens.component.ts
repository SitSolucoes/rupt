import { Component, OnInit, EventEmitter } from '@angular/core';


import { Mensagem } from './../../classes/mensagem';
import { MensagensService } from './../../services/mensagens.service';
import { NotificacoesService } from './../../services/notificacoes.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  mensagens_nLidas: Mensagem[] = [];
  notificacoes: any;
  filtroMensagens_nLidas: any;
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private _mensagemService: MensagensService,
              private _notificacoesService: NotificacoesService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getMensagens_nLidas();
  }

  getMensagens_nLidas(){
    this._mensagemService.getMensagens_nLidas().subscribe(
        (mensagens: Mensagem[]) => {
          this.mensagens_nLidas = mensagens;
        }
      );
  }

  listMensagens_nLidas(){
    if ( this.filtroMensagens_nLidas === undefined || 
         this.mensagens_nLidas.length === 0 || 
         this.filtroMensagens_nLidas.trim() === ''){
      
      return this.mensagens_nLidas;
    }
    return this.mensagens_nLidas.filter((v) => {
      if (v.conteudo.toLowerCase().indexOf(this.filtroMensagens_nLidas.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }
}
