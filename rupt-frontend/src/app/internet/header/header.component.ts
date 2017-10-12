import { MaterializeAction } from 'angular2-materialize';
import { NgForm } from '@angular/forms/src/directives';
import { Leitor } from './../../classes/leitor';
import { any } from 'codelyzer/util/function';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioLogado: any;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']});
  }

  openModalLogin() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']});
  }

  closeModal(e){
    console.log("evento: " + e);
    if(e){
      this.modalActions.emit({action:"modal",params:['close']});
    }
  }

}
