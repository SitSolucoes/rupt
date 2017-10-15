import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
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

  leitor: Leitor;
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalLogin = new EventEmitter<string|MaterializeAction>();
  modalCategoria = new EventEmitter<string|MaterializeAction>();

  constructor(private _leitorService: LeitoresService,
              private _router: Router) { }

  ngOnInit() {
      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { this.leitor = leitor }
      )

      this._leitorService.verificaLogin().subscribe();
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

    openModalCategoria() {
        this.modalCategoria.emit({
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

    closeModalCategoria(e){
        if(e){
            this.modalCategoria.emit({action:"modal",params:['close']});
        }
    }

  logout(){
    this._leitorService.logout();
    this._router.navigate(['/']);
  }

}
