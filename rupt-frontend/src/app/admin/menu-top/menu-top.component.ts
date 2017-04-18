import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  notificacoes;
  notColaboradores;
  notMensagens;
  notDenuncias;

  constructor() { }

  ngOnInit() {
    this.notColaboradores = 5;
    this.notMensagens = 7;
    this.notDenuncias = 2;

    this.notificacoes = this.notColaboradores + this.notMensagens + this.notDenuncias;
    if (this.notificacoes > 99)
      this.notificacoes = 99;
  }

}
