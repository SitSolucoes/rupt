import { Escritor } from './../../classes/escritor';
import { EscritoresService } from './../../services/escritores.service';
import { Option } from './../../shared/option';
import { NotificacoesService } from './../../services/notificacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escritores',
  templateUrl: './escritores.component.html',
  styleUrls: ['./escritores.component.css'],
})

export class EscritoresComponent implements OnInit {

  filtroEscritores: string;
  filtroSolicitacoes: string;
  notificacoes;
  escritores: Escritor[];
  solicitacoes: Escritor[];

  selectOptions: Option[] = [
    {value: 2, name: 'Nome'},
    {value: 1, name: 'Nick'},
    {value: 0, name: 'Data'}
  ];

  constructor(
    private _notificacoesService: NotificacoesService,
    private _escritoresService: EscritoresService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getEscritores();
    this.getSolicitacoes();
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

}
