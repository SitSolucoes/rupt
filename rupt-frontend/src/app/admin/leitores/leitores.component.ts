import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';
import { Option } from './../../shared/option';
import { LeitoresService } from './../../services/leitores.service';
import { DateBr } from './../../shared/dateBr';
import { Leitor } from './../../classes/leitor';

@Component({
  selector: 'app-leitores',
  templateUrl: './leitores.component.html',
  styleUrls: ['./leitores.component.css']
})
export class LeitoresComponent implements OnInit {

  message: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalMessage = new EventEmitter<string|MaterializeAction>();
  filtro: string;
  leitores;
  leitor: Leitor;
  dataInvalida;
  emailInvalido;
  nickInvalido;
  senhaValida;
  selectOptions: Option[] = [
    {value: "f", name: 'Feminino'},
    {value: "m", name: 'Masculino'}
  ];

  selectAtivo: Option[] = [
    {value: 1, name: 'Ativo'},
    {value: 0, name: 'Inativo'}
  ];

  constructor(private _leitorService: LeitoresService) {}

  ngOnInit() {
    this.leitor = new Leitor();
    this.getLeitores();
  }

  getLeitores(){
     this._leitorService.getLeitores().subscribe(
        (leitores: Leitor[]) => {this.leitores = leitores}
      );
  }

  listLeitores(){
    if ( this.filtro === undefined || this.leitores.length === 0 || this.filtro.trim() === ''){
      return this.leitores;
    }
      return this.leitores.filter((v) => {
      if (
        v.nome.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
        v.nick.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
        v.email.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0
      ) 
        return true;
      
      return false;
    });
  }

  openModal(f: NgForm) {
    this.senhaValida = false;
    this.leitor = new Leitor();

    f.resetForm(this.leitor);

    this.modalActions.emit({action:"modal",params:['open']});
  }

  showMessage(){
    this.modalMessage.emit({action:"modal",params:['open']});
  }

  openModalEdit(leitor: Leitor){
    this.emailInvalido = false;
    this.nickInvalido = false;
    this.senhaValida = true;
    this.leitor = leitor;
    this.leitor.nascimento = DateBr.convert(this.leitor.nascimento);
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    this.nickInvalido = false;
    this.emailInvalido = false;
    this.dataInvalida = false;
  }

  validaNick(){
    if (this.leitor.nick){
      if (this.leitor.nick.length >= 3){
        this._leitorService.validaNick(this.leitor.nick, this.leitor.id).subscribe(
          (nick: boolean) => {this.nickInvalido = nick}
        );
      }
      else
        this.nickInvalido = false;
    }
  }

  validaEmail(){
    if (this.leitor.email){
      if (this.leitor.email.length >= 6){
        this._leitorService.validaEmail(this.leitor.email, this.leitor.id).subscribe(
          (email: boolean) => {this.emailInvalido = email}
        );
      }
      else
        this.emailInvalido = false;
    }
  }

  validaData(e){
    if (e){
      this.leitor.nascimento = DateBr.mask(e);
      this.dataInvalida = !DateBr.valida(this.leitor.nascimento);
    }
  }

  comparaSenhas(e, confirm){
    if(confirm.value+e.key == this.leitor.password){
      this.senhaValida = true;
    }
    else 
      this.senhaValida = false;
  }

  onSubmit(form){
    if (this.leitor.id == 0){
      this._leitorService.createLeitor(form).subscribe(
        (response: any) => {
          this.message = response;
          this.getLeitores();
        }
      );
    }
    else {
      this._leitorService.updateLeitor(form, this.leitor.id).subscribe(
          (response: any) => {
            this.message = response;
            this.getLeitores();
          }
        );
    }

    this.showMessage();
}

  

}
