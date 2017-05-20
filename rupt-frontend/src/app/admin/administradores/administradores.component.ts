import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';

import {MaterializeAction} from 'angular2-materialize';
import { AdministradoresService } from '../../services/administradores.service';
import { Location } from '@angular/common';
import { Admin } from './../admin';
import { Router } from '@angular/router';
import { Option } from './../../shared/option';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  selectOptions: Option[] = [
    {value: 1, name: 'Ativo'},
    {value: 0, name: 'Inativo'}
  ];
  
  admins: Admin[];
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalMessage = new EventEmitter<string|MaterializeAction>();
  filtro: string;
  editando: boolean;
  message: string;
  admin_logado: any;
  admin_selecionado: Admin = this.newAdmin();
  email_valido: boolean = false;
  senhaValida: boolean = true;
  admin_original: Admin;
  

  constructor(private _adminService: AdministradoresService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location) { }

  ngOnInit() {
    console.log('inicia de novo');
    if(this._route.snapshot.params['id']){
      this._adminService.getAdmin(+this._route.snapshot.params['id']).subscribe(
        (admin: any) => {
          console.log('entra no console');
          this.admin_selecionado = admin;
          this.openModalEdit(this.admin_selecionado);
          //setTimeout(()=> {this.openModal()},2000)
        }
      );
    }
    this.admin_logado = localStorage.getItem('admin_id');
    this.getList();
    
  }

  getList(){
    this._adminService.getAdmins()
      .subscribe(
        (admins: Admin[]) => {this.admins = admins;}
      );
  }

  newAdmin(){
    return {id: 0, name: '', email: '', password: '', createdAt: null, UpdatedAt: null, rememberToken: null, ativo: true};
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
          (response: any) => {
              this.clear();
              this.getList();
          }
      );
    }else{
      //console.log('entra no editando');
      this._adminService.updateAdmin(form, this.admin_selecionado.id).subscribe(
        (response: any) => {
          this.message = response;
          localStorage.setItem('adminLogado', this.admin_selecionado.name);
          this.getList();
          this.clear();
          if(this._route.snapshot.params['id'])
            this._location.back();
          //this._router.navigate(['/admin/administradores']);
          //console.log(this.message)
        }
      );
    }
    this.showMessage();
  }

  validaEmail(){
    //console.log(this.admin_selecionado);
    if(this.admin_selecionado.email != '' && this.admin_selecionado.email){
      this._adminService.validaEmail(this.admin_selecionado.email, this.admin_selecionado.id).subscribe(
          (response: any) => { this.email_valido = response;}
        );
    }
  }

  comparaSenhas(e, f){
    console.log(f);
    if((f.value.confirm_senha+e.key == f.value.senha) || (f.value.confirm_senha+e.key == '' && f.value.senha == '' && this.editando)){
      this.senhaValida = true;
      return;
    }

    this.senhaValida = false;
  }

  openModal(f: NgForm) {
    this.clear();
    f.resetForm(this.admin_selecionado);
    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalEdit(admin: Admin) {
    //flag para mostrar dados
    this.clear();
    this.admin_selecionado = admin;
    this.editando = true;
    
    //pega o admin selecionado
    this.modalActions.emit({action:"modal",params:['open']});
    
  }

  clear(){
    this.editando = false;
    this.message = '';
    this.email_valido = true;
    this.admin_selecionado = this.newAdmin();
    this.senhaValida = true;
  }

  closeModal() {
    this.clear();
    this.getList();
    this.modalActions.emit({action:"modal",params:['close']});
    if(this._route.snapshot.params['id'])
      this._location.back();
  }

   showMessage(){
      this.modalMessage.emit({action:"modal",params:['open']});
   }
}
