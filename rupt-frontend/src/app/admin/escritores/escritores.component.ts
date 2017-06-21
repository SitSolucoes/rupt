import { LeitoresService } from './../../services/leitores.service';
import { Bancos } from './../../shared/arrayBanco';
import { Estados } from './../../shared/arrayEstados';
import { DateBr } from './../../shared/dateBr';
import { NgForm } from '@angular/forms/src/directives';
import { MaterializeAction } from 'angular2-materialize';
import { Escritor } from './../../classes/escritor';
import { EscritoresService } from './../../services/escritores.service';
import { Option } from './../../shared/option';
import { NotificacoesService } from './../../services/notificacoes.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { 
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/core';
 
declare var Materialize:any;

@Component({
  selector: 'app-escritores',
  templateUrl: './escritores.component.html',
  styleUrls: ['./escritores.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(10%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(10%)', opacity: 0}))
        ])
      ]
    )
  ],
})



export class EscritoresComponent implements OnInit {
  
  mSolicitacao = 0;
  mEscrires = 0;
  cpfInvalido: boolean;
  dataInvalida: boolean;
  emailInvalido: boolean;
  nickInvalido: boolean;
  senhaValida: boolean;
  filtroEscritores: string;
  filtroSolicitacoes: string;
  notificacoes;
  escritor: Escritor;
  escritores: Escritor[];
  solicitacoes: Escritor[];
  recusar: boolean;
  mensagem: string;
  newPage: number = 1;
  namePage: string[] = ["Dados Pessoais", "Endereço", "Dados Bancários", "Senha"];

  modalActions = new EventEmitter<string|MaterializeAction>();
  modalMessage = new EventEmitter<string|MaterializeAction>();

  selectOptions: Option[] = [
    {value: 2, name: 'Nome'},
    {value: 1, name: 'Nick'},
    {value: 0, name: 'Data'}
  ];

  selectSexo: Option[] = [
    {value: 'f', name: 'Feminino'},
    {value: 'm', name: 'Masculino'}
  ]

  selectSolicitacao: Option[] = [
    {value: 1, name: 'Card'},
    {value: 0, name: 'Lista'}
  ]

  selectEscritor: Option[]= [
    {value: 0, name: 'Lista'},
    {value: 1, name: 'Card'}
  ]

  selectAtivo: Option[] = [
    {value: 1, name: 'Ativo'},
    {value: 0, name: 'Inativo'}
  ];

  selectStatus: Option[] = [
    {value: 'a', name: 'Ativo'},
    {value: 'i', name: 'Inativo'}
  ]

  selectBancos: Option[] = Bancos;
  selectEstados: Option[] = Estados;

  constructor(
    private _notificacoesService: NotificacoesService,
    private _escritoresService: EscritoresService,
    private _leitoresService:LeitoresService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getEscritores();
    this.getSolicitacoes();
    this.escritor = new Escritor();
  }

  private setFalse(){
    this.emailInvalido = false;
    this.nickInvalido = false;
    this.senhaValida = true;
    this.dataInvalida = false;
    this.recusar = false;
  }

  openModal(f: NgForm){
    this.setFalse();
    this.escritor = new Escritor();

    f.reset(this.escritor);

    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalEdit(escritor: Escritor, f: NgForm) {
    Materialize.updateTextFields();

    this.setFalse();
    this.escritor = escritor;

    Materialize.updateTextFields();

    if (this.escritor.nascimento.indexOf("/")<0)
      this.escritor.nascimento = DateBr.convert(this.escritor.nascimento);
    if (this.escritor.created_at.indexOf("/")<0)
      this.escritor.created_at = DateBr.convert(this.escritor.created_at);

    Materialize.updateTextFields();

    f.reset(this.escritor);
    
    Materialize.updateTextFields();
    
    this.modalActions.emit({action:"modal",params:['open']});

    Materialize.updateTextFields();

    
  }

  closeModal() {
    this.getEscritores();
    this.getSolicitacoes();
    this.modalActions.emit({action:"modal",params:['close']});
  }

  getBanco(){
    if(this.escritor.banco) 
      return this.selectBancos.filter(banco => banco.value == this.escritor.banco)[0].name;
    else 
      return "";
  }

  getUf(){
    if(this.escritor.uf)
      return this.selectBancos.filter(uf => uf.value == this.escritor.uf)[0].name;
    else
      return "";
  }

  getEscritores(){
    this._escritoresService.getEscritores().subscribe(
      (escritores: Escritor[]) => {this.escritores = escritores}
    )
  }

  getSolicitacoes(){
    this._escritoresService.getSolicitacoes().subscribe(
      (solicitacoes: Escritor[]) => {this.solicitacoes = solicitacoes}
    )
  }

  listEscritores(){
    if ( this.filtroEscritores === undefined || this.escritores.length === 0 || this.filtroEscritores.trim() === ''){
      return this.escritores;
    }

      return this.escritores.filter((v) => {
      if (
        v.cpf.toLocaleLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0 ||
        v.nome.toLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0 ||
        v.nick.toLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0 ||
        v.email.toLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0
      ) 
        return true;
      
      return false;
    });
  }

  listSolicitacoes(){
    if ( this.filtroSolicitacoes === undefined || this.solicitacoes.length === 0 || this.filtroSolicitacoes.trim() === ''){
      return this.solicitacoes;
    }

      return this.solicitacoes.filter((v) => {
      if (
        v.cpf.toLocaleLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0 ||
        v.nome.toLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0 ||
        v.nick.toLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0 ||
        v.email.toLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0
      ) 
        return true;
      
      return false;
    });
  }

  validaNick(){
    if (this.escritor.nick){
      if (this.escritor.nick.length >= 3){
        this._leitoresService.validaNick(this.escritor.nick, this.escritor.id).subscribe(
          (nick: boolean) => {this.nickInvalido = nick}
        );
      }
      else
        this.nickInvalido = false;
    }
  }

  validaEmail(){
    if (this.escritor.email){
      if (this.escritor.email.length >= 6){
        this._leitoresService.validaEmail(this.escritor.email, this.escritor.id).subscribe(
          (email: boolean) => {this.emailInvalido = email}
        );
      }
      else
        this.emailInvalido = false;
    }
  }

  validaCpf(){
    
  }

  validaData(e){
    if (e){
      this.escritor.nascimento = DateBr.mask(e);
      this.dataInvalida = !DateBr.valida(this.escritor.nascimento);
    }
  }

  comparaSenhas(e, confirm){
    if(confirm.value+e.key == this.escritor.password){
      this.senhaValida = true;
    }
    else 
      this.senhaValida = false;
  }

  private afterSubmit(mensagem: string){
    this.closeModal();
    this.mensagem = mensagem;
    this.showMessage();
    this.getEscritores();
    this.getSolicitacoes();
  }

  onSubmit(form){
    if (this.escritor.id == 0){
      this._escritoresService.createEscritor(form).subscribe(
        (response: any) => {
          this.afterSubmit("Salvo com sucesso.");
        }
      );
    }
    else if (this.recusar){
      this._escritoresService.recusarEscritor(form.value.motivo_recusa, this.escritor.id).subscribe(
        (response: any) => {
          this.afterSubmit("Recusado com sucesso");
        }
      );
    }
    else {
      this._escritoresService.updateEscritor(form, this.escritor.id).subscribe(
        (response: any) => {
          this.afterSubmit("Salvo com sucesso.");
        }
      );
    }
  }

  aceitar(id){
    this._escritoresService.aceitarEscritor(id).subscribe(
      (response: any) => {
        this.afterSubmit("Aceito com sucesso.");
      }
    )
  }

  showMessage(){
    this.modalMessage.emit({action:"modal",params:['open']});
  }

}
