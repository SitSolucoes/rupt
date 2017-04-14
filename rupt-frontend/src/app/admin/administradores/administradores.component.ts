import { AdministradoresService } from './administradores.service';
import { Admin } from './admin';
import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  constructor(private _adminService: AdministradoresService) { }

  ngOnInit() {
    this._adminService.getAdmins()
      .subscribe(
        (admins: Admin[]) => this.admins = admins
      );
  }

  filtro: string;
  editando: boolean;
  admin_selecionado: Admin;

  getAdmins(){
    if ( this.filtro === undefined
    || this.admins.length === 0 || this.filtro.trim() === ''){
      return this.admins;
    }

     return this.admins.filter((v) => {
      if (v.name.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

  admins: Admin[];

  modalActions = new EventEmitter<string|MaterializeAction>();

  updateAdmin(){

  }

  openModal() {
    this.admin_selecionado = null;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalEdit(admin: Admin) {
    //flag para mostrar dados
    this.admin_selecionado = admin;
    //pega o admin selecionado
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.editando = false;
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
