import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'app/services/categorias.service';
import { Categoria } from 'app/classes/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

    categorias: Categoria[];

    constructor(private _categoriaService: CategoriasService) { }

    ngOnInit() {
        this._categoriaService.paramCategoria.subscribe(
            (categoria) => { console.log(categoria) }
        )

    }

}
