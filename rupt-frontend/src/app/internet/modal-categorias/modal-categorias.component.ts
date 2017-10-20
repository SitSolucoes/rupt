import { CategoriaFiltro } from './../../classes/categoria-filtro';
import { CategoriaFiltroService } from './../../services/categoria-filtro.service';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.component.html',
  styleUrls: ['./modal-categorias.component.css']
})
export class ModalCategoriasComponent implements OnInit {

    @Output('closeModalCategoria') closeModalCategoria = new EventEmitter();

    categoriasFiltro: CategoriaFiltro[];

    constructor(private _categoriaFiltroService: CategoriaFiltroService) { }

    ngOnInit() {
        this.getCategoriasFiltro();
    }

    getCategoriasFiltro(){
        this._categoriaFiltroService.getCategoriasFiltro().subscribe(
            ( categoriasFiltro ) => { this.categoriasFiltro = categoriasFiltro }
        )
    }

}

