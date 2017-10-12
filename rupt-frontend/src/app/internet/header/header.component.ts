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
  modalLogin = new EventEmitter<string|MaterializeAction>();

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.modalActions.emit({
      action: 'modal',
      params: ['open']});
  }

  openModalLogin() {
    this.modalLogin.emit({
      action: 'modal',
      params: ['open']});
  }

  closeModal(e){
    if(e){
      this.modalActions.emit({action:"modal",params:['close']});
    }
  }

  closeModalLogin(e){
    if(e){
      this.modalLogin.emit({action:"modal",params:['close']});
    }
  }

}
