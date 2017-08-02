import { PagamentoService } from './../../services/pagamento.service';
import { Pagamento } from './../../classes/pagamento';
import { NotificacoesService } from './../../services/notificacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  filtroPagamento: string;
  filtroPendente: string;
  notificacoes;
  pagamentos: Pagamento[];
  pendentes: Pagamento[];

  constructor(private _notificacoesService: NotificacoesService, 
              private _pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getPendentes();
  }

  getPendentes(){
    this._pagamentoService.getPagamentosPendentes().subscribe(
      (pendentes: Pagamento[]) => {this.pendentes = pendentes}
    )
  }

  /*listPendentes(){
    if ( this.filtroPendente === undefined || this.pendentes.length === 0 || this.filtroPendente.trim() === ''){
      return this.pendentes;
    }

      return this.pendentes.filter((v) => {
      if (
        v.cpf.toLocaleLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0 ||
        v.nome.toLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0 ||
        v.nick.toLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0 ||
        v.email.toLowerCase().indexOf(this.filtroEscritores.toLowerCase()) >= 0
      ) 
        return true;
      
      return false;
    });
  }*/

}
