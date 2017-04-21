import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-leitores',
  templateUrl: './leitores.component.html',
  styleUrls: ['./leitores.component.css']
})
export class LeitoresComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();

  leitores;
  leitor_selecionado;

  constructor() { }

  ngOnInit() {
    this.leitor_selecionado = null;
  }

  getLeitores(){
    return this.leitores;
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

}
