import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-administrativo',
  templateUrl: './painel-administrativo.component.html',
  styleUrls: ['./painel-administrativo.component.css']
})
export class PainelAdministrativoComponent implements OnInit {

  notificacoes = [{"colaboradores":0},{"mensagens":0},{"denuncias":0}];
  
  constructor() { }

  ngOnInit() {
    this.notificacoes["colaboradores"] = 2;
    this.notificacoes["mensagens"] = 15;
    this.notificacoes["denuncias"]  = 1;
  }

}
