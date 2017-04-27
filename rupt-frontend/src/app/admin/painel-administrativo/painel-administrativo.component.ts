import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-painel-administrativo',
  templateUrl: './painel-administrativo.component.html',
  styleUrls: ['./painel-administrativo.component.css']
})
export class PainelAdministrativoComponent implements OnInit {

  notificacoes = [{"escritores":0},{"mensagens":0},{"denuncias":0},{"categorias":0}];
  
  constructor(private _router: Router) { }

  ngOnInit() {
    this.notificacoes["escritores"] = 3;
    this.notificacoes["mensagens"] = 0;
    this.notificacoes["denuncias"]  = 9;
    this.notificacoes["categorias"] = 1;
  }

}
