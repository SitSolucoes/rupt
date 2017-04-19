import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'menu-esquerda',
  templateUrl: './menu-esquerda.component.html',
  styleUrls: ['./menu-esquerda.component.css']
})
export class MenuEsquerdaComponent implements OnInit {

  @Input() notificacoes;

  constructor() { }

  ngOnInit() {
  }

}
