import { Categoria } from './../../classes/categoria';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  @Input() categoria: Categoria;

  constructor() { }

  ngOnInit() {
  }

}
