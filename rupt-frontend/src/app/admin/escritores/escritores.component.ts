import { Escritor } from './../../classes/escritor';
import { EscritoresService } from './../../services/escritores.service';
import { Option } from './../../shared/option';
import { NotificacoesService } from './../../services/notificacoes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escritores',
  templateUrl: './escritores.component.html',
  styleUrls: ['./escritores.component.css']
})
export class EscritoresComponent implements OnInit {

  notificacoes;
  escritores: Escritor[];
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
  }

  getEscritores(){
    this._escritoresService.getEscritores().subscribe(
      (escritores: Escritor[]) => {this.escritores = escritores}
    )
  }

}
