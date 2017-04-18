import { NgForm } from '@angular/forms/src/directives';
import { Option } from './../../shared/option';
import { AdministradoresService } from '../../services/administradores.service';
import { Admin } from './admin';
import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  selectOptions: Option[] = [
    {value: 1, name: 'Ativo'},
    {value: 0, name: 'Inativado'}
  ];
  admins: Admin[];
  modalActions = new EventEmitter<string|MaterializeAction>();
  filtro: string;
  editando: boolean;
  admin_selecionado: Admin;
  email_valido: boolean = false;

  constructor(private _adminService: AdministradoresService) { }

  ngOnInit() {
    this._adminService.getAdmins()
      .subscribe(
        (admins: Admin[]) => this.admins = admins
      );
  }

  getAdmins(){
    if ( this.filtro === undefined || this.admins.length === 0 || this.filtro.trim() === ''){
      return this.admins;
    }
      return this.admins.filter((v) => {
      if (v.name.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });
  }

  onSubmit(form){
    if(!this.editando){
      this._adminService.createAdmin(form).subscribe(
        (response: any) => alert("Admin Criado com Sucesso!")
      );
      this._adminService.getAdmins()
      .subscribe(
        (admins: Admin[]) => this.admins = admins
      );
    }else{
      //this._adminService.createAdmin(admin).subscribe();
    }
    //this._adminService.createAdmin()
    //  .subscribe();
  }

  validaEmail(form){
    if(form.value.email != '')
      this._adminService.validaEmail(form.value.email).subscribe(
          (response: any) => this.email_valido = response
        );
    console.log(this.email_valido);
      //if(!this.email_valido){
       // alert('Email já utilizado');
      //  form.value.email = '';
      //}else
      //  alert("teste");
  }

  openModal() {
    this.email_valido = true;
    this.admin_selecionado = null;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalEdit(admin: Admin) {
    //flag para mostrar dados
    this.email_valido = true;
    this.admin_selecionado = admin;
    //pega o admin selecionado
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.editando = false;
    this.email_valido = true;
    this.modalActions.emit({action:"modal",params:['close']});
  }
}
