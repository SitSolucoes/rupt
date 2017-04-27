import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  notificacoes = [{"escritores":0},{"mensagens":0},{"denuncias":0},{"categorias":0}];

  constructor() { }

  admin_name: string = localStorage.getItem('adminLogado');

  ngOnInit() {
    this.notificacoes["escritores"] = 3;
    this.notificacoes["mensagens"] = 0;
    this.notificacoes["denuncias"]  = 9;
    this.notificacoes["categorias"] = 1;
  }

}
