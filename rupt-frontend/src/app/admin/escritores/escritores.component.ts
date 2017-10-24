import { ConnectionFactory } from 'app/classes/connection-factory';
import { Http } from '@angular/http';
import { Leitor } from './../../classes/leitor';
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
import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';

import { 
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
} from '@angular/core';
import { UploadFileService } from "app/services/upload-file.service";
import { UploadItem } from "app/classes/upload-item";
import { validarCpf } from "app/shared/valida-cpf";

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
  notificacoes;
  mSolicitacao = 1;
  mEscritor = 1;
  dataInvalida: boolean;
  emailInvalido: boolean;
  nickInvalido: boolean;
  cpfUsado: boolean;
  cpfInvalido: boolean;
  senhaValida: boolean;
  recusar: boolean;

  //masks
  dateMask = [/[1-9]/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  
  filtroEscritores: string;
  filtroSolicitacoes: string;
  mensagem: string;
  mensagemConfirm: string;
  mensagemErro: string = '';
  namePage: string[] = ["Dados Pessoais", "Endereço", "Dados Bancários", "Senha"];
  
  newPage: number = 1;
  idLeitor: number;

  escritor: Escritor;
  escritores: Escritor[];
  solicitacoes: Escritor[];
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalMessage = new EventEmitter<string|MaterializeAction>();
  modalConfirm = new EventEmitter<string|MaterializeAction>();

  selectOptions: Option[] = [
    {value: 1, name: 'Nick'},
    {value: 2, name: 'Nome'},
  ];

  selectOptionsSolicitacao: Option[] = [
    {value: 1, name: 'Nick'},
    {value: 2, name: 'Nome'},
    {value: 3, name: 'Data'},
  ];

  selectSexo: Option[] = [
    {value: 'f', name: 'Feminino'},
    {value: 'm', name: 'Masculino'},
    {value: 'o', name: 'Outros'}
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

  url = ConnectionFactory.API_IMAGEM;

  ordemEscritor = 1;
  ordemSolicitacao = 3;

  private ordenacoesEscritor = [
    {'nome': null},
    {'nick': true}
  ];
  private ordenacoesSolicitacao = [
    {'nome': null},
    {'nick': null},
    {'data': true}
  ];

  constructor(
    private _notificacoesService: NotificacoesService,
    private _escritoresService: EscritoresService,
    private _leitoresService:LeitoresService,
    private _http: Http,
    private _uploadFileService: UploadFileService
    ) { }

  ngOnInit() {
    this.ordenacoesEscritor['nick'] = true;
    this.ordenacoesSolicitacao['data'] = true;

    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getEscritores();
    this.getSolicitacoes();
    this.escritor = new Escritor();
  }

  private setFalse(){
    this.emailInvalido = false;
    this.nickInvalido = false;
    this.cpfUsado = false;
    this.cpfInvalido = false;
    this.senhaValida = true;
    this.dataInvalida = false;
    this.recusar = false;
    this.newPage = 1;
    this.idLeitor = 0;
    this.mensagemErro = '';
  }

  openModal(f: NgForm){
    this.setFalse();
    this.escritor = new Escritor();

    f.reset(this.escritor);

    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalEdit(escritor: Escritor, f: NgForm) {
    this.setFalse();
    this.escritor = escritor;

    if (this.escritor.nascimento.indexOf("/")<0)
      this.escritor.nascimento = DateBr.convert(this.escritor.nascimento);
    if (this.escritor.created_at.indexOf("/")<0)
      this.escritor.created_at = DateBr.convert(this.escritor.created_at);

    f.reset(this.escritor);

    this.modalActions.emit({action:"modal",params:['open']});
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
      return this.selectEstados.filter(uf => uf.value == this.escritor.uf)[0].name;
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
        (v.cpf.toLocaleLowerCase().replace(/\D/g,'').indexOf(this.filtroEscritores.toLowerCase().replace(/\D/g,'')) >= 0
          && this.filtroEscritores.toLowerCase().replace(/\D/g,'').length > 0 ) ||
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
        (v.cpf.toLocaleLowerCase().replace(/\D/g,'').indexOf(this.filtroSolicitacoes.toLowerCase().replace(/\D/g,'')) >= 0
          && this.filtroSolicitacoes.toLowerCase().replace(/\D/g,'').length > 0 ) ||
        v.nome.toLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0 ||
        v.nick.toLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0 ||
        v.email.toLowerCase().indexOf(this.filtroSolicitacoes.toLowerCase()) >= 0
      ) 
        return true;
      
      return false;
    });
  }

  nickCadastrado(){
    if (this.escritor.nick){
      this._escritoresService.existNick(this.escritor.nick).subscribe(
        (idLeitor: number) => {
          this.mensagemConfirm = "Nick já cadastrado.";
          if (idLeitor != 0){
            this.modalConfirm.emit({action:"modal",params:['open']});
            this.idLeitor = idLeitor;
          }
        }
      );
    }
  }

  emailCadastrado(){
    if (this.escritor.email){
      this._escritoresService.existEmail(this.escritor.email).subscribe(
        (idLeitor: number) => {
          this.mensagemConfirm = "Email já cadastrado."; 
          if (idLeitor != 0)
            this.modalConfirm.emit({action:"modal",params:['open']});
            this.idLeitor = idLeitor;
        }
      );
    }
  }

  noConfirm(){
    this.modalConfirm.emit({action:"modal",params:['close']});
  }

  yesConfirm(f: NgForm){
    this._leitoresService.getLeitor(this.idLeitor).subscribe(
        (leitor: Leitor) => {
          this.escritor = new Escritor();
          this.escritor.setLeitor(leitor);
          
          if (this.escritor.nascimento.indexOf("/")<0)
            this.escritor.nascimento = DateBr.convert(this.escritor.nascimento);
          
          this.nickInvalido = false;
          this.emailInvalido = false;
          
          f.reset(this.escritor);
        }
      );
  }

  validaNick(){
    if (this.escritor.nick){
      if (this.escritor.nick.length >= 3){
        this._leitoresService.validaNick(this.escritor.nick, this.escritor.id).subscribe(
          (nick: boolean) => {
            this.nickInvalido = nick;
            this.mensagemConfirm = "Nick já cadastrado.";
          }
        );
      }
      else
        this.nickInvalido = false;
    }
    else
      this.nickInvalido = false;
  }

  validaEmail(){
    if (this.escritor.email){
      if (this.escritor.email.length >= 6){
        this._leitoresService.validaEmail(this.escritor.email, this.escritor.id).subscribe(
          (email: boolean) => {
            this.emailInvalido = email;
            this.mensagemConfirm = "Email já cadastrado."; 
          }
        );
      }
      else
        this.emailInvalido = false;
    }
    else
      this.emailInvalido = false;
  }

  validaCpf(){
    if (this.escritor.cpf){
      let cpf = this.escritor.cpf.replace(/\D/g,'');

      if (cpf.length == 11){
        this.cpfInvalido = !validarCpf(cpf);

        if (!this.cpfInvalido){
          this._escritoresService.existCpf(cpf, this.escritor.id).subscribe(
            (cpfUsado: boolean) => {
              this.cpfUsado = cpfUsado;
            }
          );
        }
      }
      else {
        this.cpfUsado = false;
        this.cpfInvalido = true;
      }
    }
    else
      this.cpfUsado = false;
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

  consultaCep(cep){
    cep = cep.replace(/\D/g, '');

    if (cep != ''){
      let validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)){
        this._http.get("//viacep.com.br/ws/"+cep+"/json")
          .map(dados => dados.json())
          .subscribe(dados => {
            this.escritor.logradouro = dados.logradouro;
            this.escritor.bairro = dados.bairro;  
            this.escritor.cidade = dados.localidade;
            this.escritor.uf = dados.uf;
          });
      }
    }
  }

  ordenarEscritor(por){
    switch(por){
        case '2': {
            this.ordenacoesEscritor['nick'] = null;
            
            if (this.ordenacoesEscritor['nome']){
              this.ordenacoesEscritor['nome'] = null;
              this.escritores.sort((e1, e2) => {
                if (e1.nome > e2.nome)
                  return -1;
                else if (e1.nome < e2.nome) 
                  return 1;
                return 0;
              });
            }
            else {
              this.ordenacoesEscritor['nome'] = true;
              this.escritores.sort((e1, e2) => {
                  if (e1.nome > e2.nome)
                    return 1;
                  else if (e1.nome < e2.nome) 
                    return -1;
                  return 0;
              });
            }
            
            break;
        }
        case '1': {
          this.ordenacoesEscritor['nome'] = null;
          
          if (this.ordenacoesEscritor['nick']){
            this.ordenacoesEscritor['nick'] = null;
            this.escritores.sort((e1, e2) => {
              if (e1.nick > e2.nick)
                return -1;
              else if (e1.nick < e2.nick) 
                return 1;
              return 0;
            });
          }
          else {
            this.ordenacoesEscritor['nick'] = true;
            this.escritores.sort((e1, e2) => {
                if (e1.nick > e2.nick)
                  return 1;
                else if (e1.nick < e2.nick) 
                  return -1;
                return 0;
            });
          }
          
          break;
        }
    }
  }

  ordenarSolicitacao(por){
    switch(por){
      case '3': {
        this.ordenacoesSolicitacao['nick'] = null;
        this.ordenacoesSolicitacao['nome'] = null;
        
        if (this.ordenacoesSolicitacao['data']){
          this.ordenacoesSolicitacao['data'] = null;
          this.solicitacoes.sort((e1, e2) => {
            if (e1.data_aceite > e2.data_aceite)
              return -1;
            else if (e1.data_aceite < e2.data_aceite) 
              return 1;
            return 0;
          });
        }
        else {
          this.ordenacoesSolicitacao['date'] = true;
          this.solicitacoes.sort((e1, e2) => {
              if (e1.created_at > e2.created_at)
                return 1;
              else if (e1.created_at < e2.created_at) 
                return -1;
              return 0;
          });
        }
        
        break;
      }
      case '2': {
          this.ordenacoesSolicitacao['nick'] = null;
          this.ordenacoesSolicitacao['data'] = null;
          
          if (this.ordenacoesSolicitacao['nome']){
            this.ordenacoesSolicitacao['nome'] = null;
            this.solicitacoes.sort((e1, e2) => {
              if (e1.nome > e2.nome)
                return -1;
              else if (e1.nome < e2.nome) 
                return 1;
              return 0;
            });
          }
          else {
            this.ordenacoesSolicitacao['nome'] = true;
            this.solicitacoes.sort((e1, e2) => {
                if (e1.nome > e2.nome)
                  return 1;
                else if (e1.nome < e2.nome) 
                  return -1;
                return 0;
            });
          }
          
          break;
      }
      case '1': {
        this.ordenacoesSolicitacao['nome'] = null;
        this.ordenacoesSolicitacao['data'] = null;
        
        if (this.ordenacoesSolicitacao['nick']){
          this.ordenacoesSolicitacao['nick'] = null;
          this.solicitacoes.sort((e1, e2) => {
            if (e1.nick > e2.nick)
              return -1;
            else if (e1.nick < e2.nick) 
              return 1;
            return 0;
          });
        }
        else {
          this.ordenacoesSolicitacao['nick'] = true;
          this.solicitacoes.sort((e1, e2) => {
              if (e1.nick > e2.nick)
                return 1;
              else if (e1.nick < e2.nick) 
                return -1;
              return 0;
          });
        }
        
        break;
      }
    }
  }

  private afterSubmit(mensagem: string){
    this.closeModal();
    this.mensagem = mensagem;
    this.showMessage();
    this.getEscritores();
    this.getSolicitacoes();
    this.notificacoes = this._notificacoesService.getNotificacoes();
  }

  onSubmit(form){
    this.mensagemErro = "";

    if (this.escritor.id == 0 || this.idLeitor != 0){
        if (!(<HTMLInputElement>window.document.getElementById('doc1')).files[0] ||
          !(<HTMLInputElement>window.document.getElementById('doc2')).files[0] ||
          !(<HTMLInputElement>window.document.getElementById('doc3')).files[0])
            this.mensagemErro = "Inclua as imagens dos documentos.";
        else {
            this._escritoresService.createEscritor(form, this.escritor.id).subscribe(
              (response: any) => {
                this.uploadFiles(form, response);
              }
            );
        }
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
            //this.uploadFiles(form, this.escritor.id);
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
  closeMessage(){
    this.modalMessage.emit({action:"modal",params:['close']});
  }


  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.closeMessage();
    this.closeModal();
  }

  uploadFiles(form, id){
    let files = new Array();
    files.push((<HTMLInputElement>window.document.getElementById('doc1')).files[0]);
    files.push((<HTMLInputElement>window.document.getElementById('doc2')).files[0]);
    files.push((<HTMLInputElement>window.document.getElementById('doc3')).files[0]);

    let file_names = ['doc1', 'doc2', 'doc3'];

    let myUploadItem = new UploadItem(files, file_names, "escritor/uploadDocs/"+id);
    
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

    this.afterSubmit("Salvo com sucesso.");
  }
}