import { Categoria } from './../../classes/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private _categoriasService: CategoriasService) { }

  categorias;

  ngOnInit() {
    if(!localStorage.getItem('l')){
      this._categoriasService.getCategoriasAtivas().subscribe(
        (categorias: Categoria[]) => {
          this.categorias = categorias
          });
    }
  }

}
