import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Mensagem } from './../../classes/mensagem';
import { MensagensService } from './../../services/mensagens.service';
import { NotificacoesService } from './../../services/notificacoes.service';
import { LeitoresService } from './../../services/leitores.service';
import { AdministradoresService } from './../../services/administradores.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  mensagens_nLidas: Mensagem[] = [];
  mensagens_lidas: Mensagem[] = [];
  notificacoes: any;
  filtroMensagens_nLidas: any;
  filtroMensagens_lidas: any;
  resposta_msg_selecionada: Mensagem;
  vetor_ordena: string[];
  private ordenacoes = [
    {'remetente': null},
    {'data': null}
  ];
  spinner: boolean = false;
  private mensagem_selecionada: Mensagem;
  private resposta: string;

  modalMessage = new EventEmitter<string|MaterializeAction>();
  modalLida = new EventEmitter<string|MaterializeAction>();
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private _mensagemService: MensagensService,
              private _notificacoesService: NotificacoesService,
              private _adminService: AdministradoresService,
              private _leitorService: LeitoresService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.clear();
    this.getMensagens_nLidas();
    this.getMensagens_lidas();
  }

  zera(){ 
    this.notificacoes = this._notificacoesService.getNotificacoes();  
    this.clear();
    this.getMensagens_nLidas();
    this.getMensagens_lidas();
  }

  mostralog(r){
    console.log(r);
  }

  getMensagens_nLidas(){
    this.spinner = true;
    this._mensagemService.getMensagens_nLidas().subscribe(
        (mensagens: Mensagem[]) => {
          this.mensagens_nLidas = mensagens;
          this.spinner = false;
        }
      );
  }

  ordena(por){
    switch(por){
      case 'nome':{
        if(!this.ordenacoes['remetente']|| this.ordenacoes['remetente'] == null){
          this.ordenacoes['remetente'] = true;
          this.mensagens_nLidas.sort((n1,n2)=> {
              if(n1.nome>n2.nome)
                return 1;
              if(n1.nome<n2.nome)
                return -1;
              return 0;
            }
          );
        break;
        }else{
          if(this.ordenacoes['remetente'] != null){
            this.ordenacoes['remetente'] = false;
            this.mensagens_nLidas.sort((n1,n2)=> {
                if(n1.nome>n2.nome)
                  return -1;
                if(n1.nome<n2.nome)
                  return 1;
                return 0;
              }
            );
          break;
          }
          
        }
      }
      case 'data':{
        if(!this.ordenacoes['data']|| this.ordenacoes['data'] == null){
          this.ordenacoes['data'] = true;
          this.mensagens_nLidas.sort((n1,n2)=> {
              if(n1.created_at>n2.created_at)
                return 1;
              if(n1.created_at<n2.created_at)
                return -1;
              return 0;
            }
          );
        break;
        }else{
          if(this.ordenacoes['data'] != null){
            this.ordenacoes['data'] = false;
            this.mensagens_nLidas.sort((n1,n2)=> {
                if(n1.created_at>n2.created_at)
                  return -1;
                if(n1.created_at<n2.created_at)
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

ordena_lidas(por){
    switch(por){
      case 'nome':{
        if(!this.ordenacoes['remetente']|| this.ordenacoes['remetente'] == null){
          this.ordenacoes['remetente'] = true;
          this.mensagens_lidas.sort((n1,n2)=> {
              if(n1.nome>n2.nome)
                return 1;
              if(n1.nome<n2.nome)
                return -1;
              return 0;
            }
          );
        break;
        }else{
          if(this.ordenacoes['remetente'] != null){
            this.ordenacoes['remetente'] = false;
            this.mensagens_lidas.sort((n1,n2)=> {
                if(n1.nome>n2.nome)
                  return -1;
                if(n1.nome<n2.nome)
                  return 1;
                return 0;
              }
            );
          break;
          }
          
        }
      }
      case 'data':{
        if(!this.ordenacoes['data']|| this.ordenacoes['data'] == null){
          this.ordenacoes['data'] = true;
          this.mensagens_lidas.sort((n1,n2)=> {
              if(n1.created_at>n2.created_at)
                return 1;
              if(n1.created_at<n2.created_at)
                return -1;
              return 0;
            }
          );
        break;
        }else{
          if(this.ordenacoes['data'] != null){
            this.ordenacoes['data'] = false;
            this.mensagens_lidas.sort((n1,n2)=> {
                if(n1.created_at>n2.created_at)
                  return -1;
                if(n1.created_at<n2.created_at)
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

  getMensagens_lidas(){
    this.spinner = true;
    this._mensagemService.getMensagens_lidas().subscribe(
        (mensagens: any) => {
          for(let l of mensagens){
              let m: Mensagem;
              m = this.monta(l);
              this._adminService.getAdmin(l.admin_idAdmin).subscribe(
                     (admin: any)=>{
                        m.Admin = admin;
                        if(l.leitor_idLeitor != null){
                          this._leitorService.getLeitor(l.admin_idAdmin).subscribe(
                            (leitor: any)=>{
                              m.Leitor = leitor
                            });
                        }
                        this.mensagens_lidas.push(m);
                     });
              
          }
          this.spinner = false;
        }
      );
  }

  monta(m): Mensagem{
    let mensagem = new Mensagem();
    mensagem.id = m.id;
    mensagem.nome = m.nome;
    mensagem.assunto = m.assunto;
    mensagem.conteudo = m.conteudo;
    mensagem.lida = m.lida;
    mensagem.remetente = m.remetente;
    mensagem.created_at = m.created_at;
    mensagem.updated_at = m.updated_at;
    return mensagem;
  }

  listMensagens_nLidas(){
    if ( this.filtroMensagens_nLidas === undefined || 
         this.mensagens_nLidas.length === 0 || 
         this.filtroMensagens_nLidas.trim() === ''){
      
      return this.mensagens_nLidas;
    }
    return this.mensagens_nLidas.filter((v) => {
      if (v.conteudo.toLowerCase().indexOf(this.filtroMensagens_nLidas.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }

  listMensagens_lidas(){
    if ( this.filtroMensagens_lidas === undefined || 
         this.mensagens_lidas.length === 0 || 
         this.filtroMensagens_lidas.trim() === ''){
      return this.mensagens_lidas;
    }
    return this.mensagens_lidas.filter((v) => {
      if (v.conteudo.toLowerCase().indexOf(this.filtroMensagens_lidas.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }

  enviaResposta(f){
    return this._mensagemService.enviaResposta(f, this.mensagem_selecionada.id).subscribe(
          (response: any) => {
              this.clear();
              this.getMensagens_nLidas();
              this.getMensagens_lidas();
              this.showMessage();
              this.notificacoes = this._notificacoesService.getNotificacoes();
          }
      );
  }
  
  openModal(m: Mensagem) {
    this.mensagem_selecionada = m;
    this.resposta = '';
    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalLida(m: Mensagem){
    this.mensagem_selecionada = m;
    this._mensagemService.getResposta(m.id).subscribe(
      (resposta)=>{
        this.resposta_msg_selecionada = resposta;
        this.modalLida.emit({action:"modal",params:['open']});
      });
  }

  closeModalLida(){
    this.modalLida.emit({action:"modal",params:['close']});
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

   clear(){
     this.mensagem_selecionada = new Mensagem();
     this.mensagens_nLidas = [];
     this.mensagens_lidas = [];
     this.resposta_msg_selecionada = new Mensagem();
   }

   @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.closeMessage();
    this.closeModal();
    this.closeModalLida();
  }
}
