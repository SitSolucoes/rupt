import { Component, OnInit } from '@angular/core';

import { NotificacoesService } from './../../services/notificacoes.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  notificacoes;

  constructor(private _notificacoesService: NotificacoesService) { }

  admin_name: string = localStorage.getItem('adminLogado');

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
  }

}
