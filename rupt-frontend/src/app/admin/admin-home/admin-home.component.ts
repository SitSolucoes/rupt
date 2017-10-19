import { AdministradoresService } from './../../services/administradores.service';
import { Component, OnInit } from '@angular/core';

import { NotificacoesService } from './../../services/notificacoes.service';
import { Admin } from 'app/classes/admin';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  admin: Admin = new Admin();
  notificacoes;

  constructor(private _notificacoesService: NotificacoesService, 
              private _adminService: AdministradoresService) { }

  admin_name: string = localStorage.getItem('adminLogado');

  ngOnInit() {
    this._adminService.admin.subscribe(
      (response) => { this.admin = response }
    );

    this._adminService.verificaLogin().subscribe();

    this.notificacoes = this._notificacoesService.getNotificacoes();
  }

}
