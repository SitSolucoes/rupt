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
  pendentes: any[];

  constructor(private _notificacoesService: NotificacoesService, 
              private _pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.getPendentes();
  }

  getPendentes(){
    this._pagamentoService.getPagamentosPendentes().subscribe(
      (pagamentos: Pagamento[]) => {this.pendentes = pagamentos; console.log(pagamentos)}
    )
  }

  listPendentes(){
    if ( this.filtroPendente === undefined || this.pendentes.length === 0 || this.filtroPendente.trim() === ''){
      return this.pendentes;
    }

      return this.pendentes.filter((v) => {
      if (v.leitor.escritor.cpf.toLocaleLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 ||
          v.leitor.nome.toLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 ||
          v.leitor.nick.toLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 ||
          v.leitor.email.toLowerCase().indexOf(this.filtroPendente.toLowerCase()) >= 0 
      ) 
        return true;
      
      return false;
    });
  }

}
