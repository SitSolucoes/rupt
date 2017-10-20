import { CategoriaLeitorService } from './../../services/categoria-leitor.service';
import { PesoInteracao } from './../../shared/pesoInteracao';
import { CategoriaFiltro } from './../../classes/categoria-filtro';
import { CategoriaFiltroService } from './../../services/categoria-filtro.service';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriaLeitor } from 'app/classes/categoria-leitor';
import { Categoria } from 'app/classes/categoria';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.component.html',
  styleUrls: ['./modal-categorias.component.css']
})
export class ModalCategoriasComponent implements OnInit {
    @Input('id') id: number;
    @Output('closeModalCategoria') closeModalCategoria = new EventEmitter();

    categoriasFiltro: CategoriaFiltro[];
    categoriasLeitor: CategoriaLeitor[];

    constructor(private _categoriaFiltroService: CategoriaFiltroService, 
                private _categoriaLeitorService: CategoriaLeitorService) { }

    ngOnInit() {
        this.categoriasLeitor = new Array;
        this.getCategoriasFiltro();
    }

    getCategoriasFiltro(){
        this._categoriaFiltroService.getCategoriasFiltro().subscribe(
            ( categoriasFiltro ) => { this.categoriasFiltro = categoriasFiltro }
        )
    }

    checkSelected(categoria_id: number){
        let index = -1;

        for (let i = 0; i < this.categoriasLeitor.length; i++){
            if (this.categoriasLeitor[i].categoria.id == categoria_id)
                index = i;
        }

        return index;
    }

    click(categoria: Categoria){
        let index = this.checkSelected(categoria.id);

        if (index == -1){
            let categoriaLeitor: CategoriaLeitor = new CategoriaLeitor();
            categoriaLeitor.categoria = categoria;
            categoriaLeitor.peso = PesoInteracao.CATEGORIA;
            this.categoriasLeitor.push(categoriaLeitor);
        }
        else {
            this.categoriasLeitor.splice(index, 1);
        }
    }

    onSubmit(){
        this._categoriaLeitorService.create(this.categoriasLeitor, this.id).subscribe(
            ( response ) => { this.closeModalCategoria.emit(true) }
        )
    }

}

