import { UploadFileService } from 'app/services/upload-file.service';
import { MaterializeAction } from 'angular2-materialize';
import { PagamentoService } from './../../services/pagamento.service';
import { Pagamento } from './../../classes/pagamento';
import { NotificacoesService } from './../../services/notificacoes.service';
import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UploadItem } from "app/classes/upload-item";
import { DateBr } from "app/shared/dateBr";

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
              private _uploadFileService: UploadFileService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getPendentes();
    this.getPagamentos();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.closeMessage();
    this.closeModal();
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
        data_pagamento: DateBr.convert(this.pagamento.data_pagamento)
      })

      this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  showMessage(){
    this.modalMessage.emit({action:"modal",params:['open']});
  }
  closeMessage(){
    this.modalMessage.emit({action:"modal",params:['close']});
  }

  onSubmit(){
    this._pagamentoService.update(this.formulario).subscribe(
        (response: any) => {
          this.closeModal();
          this.getPagamentos();
          this.getPendentes();
        }
      );

    //this.uploadFiles();
  }

  uploadFiles(){
    let files = new Array();
    files.push((<HTMLInputElement>window.document.getElementById('doc')).files[0]);
    
    let myUploadItem = new UploadItem(files, "pagamento/uploadDoc/"+this.pagamento.id);
    
    myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

    this._uploadFileService.onSuccessUpload = (item, response, status, headers) => {
          // success callback
    };
    this._uploadFileService.onErrorUpload = (item, response, status, headers) => {
          // error callback
    };
    this._uploadFileService.onCompleteUpload = (item, response, status, headers) => {
          // complete callback, called regardless of success or failure
    };
    this._uploadFileService.upload(myUploadItem);
  }

}
