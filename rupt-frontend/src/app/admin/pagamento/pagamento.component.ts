import { MaterializeAction } from 'angular2-materialize';
import { PagamentoService } from './../../services/pagamento.service';
import { Pagamento } from './../../classes/pagamento';
import { NotificacoesService } from './../../services/notificacoes.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  filtroPagamento: string;
  filtroPendente: string;
  notificacoes;
  pagamento;
  pagamentos: any[];
  pendentes: any[];

  formulario: FormGroup;

  modalMessage = new EventEmitter<string|MaterializeAction>();
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private _notificacoesService: NotificacoesService, 
              private _pagamentoService: PagamentoService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getPendentes();
    this.getPagamentos();
  }

  createForm(){
    this.formulario = this.formBuilder.group({
      id: '',
      data_pagamento: ['', Validators.required], 
    })
  }

  getPendentes(){
    this._pagamentoService.getPagamentosPendentes().subscribe(
      (pagamentos: Pagamento[]) => {this.pendentes = pagamentos}
    )
  }

  listPendentes(){
    if ( this.filtroPendente === undefined || this.pendentes.length === 0 || this.filtroPendente.trim() === ''){
      return this.pendentes;
    }
      return this.pendentes.filter((v) => {
      if (
        (v.leitor.escritor.cpf.toLocaleLowerCase().replace(/\D/g,'').indexOf(this.filtroPendente.toLowerCase().replace(/\D/g,'')) >= 0
          && this.filtroPendente.toLowerCase().replace(/\D/g,'').length > 0 ) ||
          v.leitor.nome.toLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 ||
          v.leitor.nick.toLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 ||
          v.leitor.email.toLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 
      ) 
        return true;
      
        return false;
    });
  }

  getPagamentos(){
    this._pagamentoService.getPagamentos().subscribe(
      (pagamentos: Pagamento[]) => {this.pagamentos = pagamentos}
    )
  }

  listPagamentos(){
    if ( this.filtroPagamento === undefined || this.pagamentos.length === 0 || this.filtroPagamento.trim() === ''){
      return this.pagamentos;
    }

    return this.pagamentos.filter((v) => {
      if (
        (v.leitor.escritor.cpf.toLocaleLowerCase().replace(/\D/g,'').indexOf(this.filtroPagamento.toLowerCase().replace(/\D/g,'')) >= 0
          && this.filtroPagamento.toLowerCase().replace(/\D/g,'').length > 0 ) ||
          v.leitor.nome.toLowerCase().indexOf(this.filtroPagamento.toLowerCase()) >= 0 ||
          v.leitor.nick.toLowerCase().indexOf(this.filtroPagamento.toLowerCase()) >= 0 ||
          v.leitor.email.toLowerCase().indexOf(this.filtroPagamento.toLowerCase()) >= 0 
      ) 
        return true;
      
      return false;
    });
  }

  openModalEdit(pendente){
      this.pagamento = pendente;

      this.formulario.patchValue({
        id: this.pagamento.id,
        data_pagamento: this.pagamento.data_pagamento
      })

      this.modalActions.emit({action:"modal",params:['open']});
  }

}
