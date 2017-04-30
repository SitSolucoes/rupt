import { Component, OnInit } from '@angular/core';

import { NotificacoesService } from './../../services/notificacoes.service';
@Component({
  selector: 'app-painel-administrativo',
  templateUrl: './painel-administrativo.component.html',
  styleUrls: ['./painel-administrativo.component.css']
})
export class PainelAdministrativoComponent implements OnInit {

  notificacoes;
  
  constructor(private _notificacoesService: NotificacoesService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
  }

}
