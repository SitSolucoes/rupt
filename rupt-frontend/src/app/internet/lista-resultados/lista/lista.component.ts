import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/classes/post';
import { ConnectionFactory } from 'app/classes/connection-factory';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() search: string;
  @Input() list;
  @Input() tipo: number;

  url: string = ConnectionFactory.API_IMAGEM;

  constructor() { }

  ngOnInit() {
  }

}
