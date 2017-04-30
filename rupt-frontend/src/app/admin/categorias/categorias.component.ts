import { Component, OnInit } from '@angular/core';

import { NotificacoesService } from './../../services/notificacoes.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  notificacoes;

  constructor(private _notificacoesService: NotificacoesService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
  }

}
