import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {

  @Input() notificacoes;
  contNotificacoes: number;

  constructor() { }

  ngOnInit() {
    this.contNotificacoes = this.notificacoes["denuncias"] + this.notificacoes["escritores"] + this.notificacoes["mensagens"];
    if (this.contNotificacoes > 99)
      this.contNotificacoes = 99;
  }

}
