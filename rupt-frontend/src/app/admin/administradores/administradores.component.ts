import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';
import {MaterializeAction} from 'angular2-materialize';
import { AdministradoresService } from '../../services/administradores.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Option } from './../../shared/option';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'app/classes/admin';

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

  vetor_ordena: string[];
  private ordenacoes = [
    {'nome': null},
    {'data': null}
  ];
  

  constructor(private _adminService: AdministradoresService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location) { }

  ngOnInit() {
    if(this._route.snapshot.params['id']){
      this._adminService.getAdmin(+this._route.snapshot.params['id']).subscribe(
        (admin: any) => {
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
        (admins: Admin[]) => {this.admins = admins; this.ordenacoes['nome'] = true}
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
              this.showMessage();
              this.getList();
          }
      );
    }else{
      this._adminService.updateAdmin(form, this.admin_selecionado.id).subscribe(
        (response: any) => {
          if(this._route.snapshot.params['id']){
            this._location.back();
          }
          else {
           this.message = response;
            this.getList();
            this.clear();
            this.closeModal();
            this.showMessage();
          }
          
        }
      );
    }
    
    
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

  ordena(por){
    switch(por){
      case 'nome':{
        if(!this.ordenacoes['nome']|| this.ordenacoes['nome'] == null){
          this.ordenacoes['nome'] = true;
          this.admins.sort((n1,n2)=> {
              if(n1.name>n2.name)
                return 1;
              if(n1.name<n2.name)
                return -1;
              return 0;
            }
          );
        break;
        }else{
          if(this.ordenacoes['nome'] != null){
            this.ordenacoes['nome'] = false;
            this.admins.sort((n1,n2)=> {
                if(n1.name>n2.name)
                  return -1;
                if(n1.name<n2.name)
                  return 1;
                return 0;
              }
            );
          break;
          }
          
        }
      }
    }
      
  }

  clear(){
    this.editando = false;
    this.message = '';
    this.email_valido = true;
    this.admin_selecionado = this.newAdmin();
    this.senhaValida = true;
  }

  closeModal() {
    this.getList();
    this.modalActions.emit({action:"modal",params:['close']});
    if(this._route.snapshot.params['id']){
      //this.closeMessage();
      this._location.back();
    }
    this.clear();
  }

  closeMessage(){
    this.modalMessage.emit({action:"modal",params:['close']});
  }

   showMessage(){
      this.modalMessage.emit({action:"modal",params:['open']});
   }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.closeMessage();
    this.closeModal();
  }
}
