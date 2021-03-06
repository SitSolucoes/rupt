import { NgForm } from '@angular/forms/src/directives';
import { CategoriasService } from './../../services/categorias.service';
import { Option } from './../../shared/option';
import { MaterializeAction } from 'angular2-materialize';
import { Categoria } from './../../classes/categoria';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  @Input() listCategorias: Categoria[];
  @Input() show: number;
  @Output() created = new EventEmitter();
  
  categoria;
  subCategoria: Categoria;
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalSub = new EventEmitter<string|MaterializeAction>();
  modalMessage = new EventEmitter<string|MaterializeAction>();

  selectStatus: Option[] = [
    {value: 1, name: 'Ativo'},
    {value: 0, name: 'Inativo'}
  ]

  constructor(private _categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoria = new Categoria();
    this.subCategoria = new Categoria();
  }

  openModalEdit(categoria: Categoria){
    this.categoria = categoria;
    this.modalActions.emit({action:"modal",params:['open']});
  }

  openModalSub(form: NgForm, categoria: Categoria){
    this.categoria = categoria;
    this.subCategoria = new Categoria();
    form.reset(this.subCategoria);
    this.modalSub.emit({action:"modal",params:['open']});
  }

  onSubmit(form){
    this._categoriasService.updateCategoria(form, this.categoria.id).subscribe(
      (response: any) => {
        //this.getCategorias();
        this.showMessage();
      }
    );
  }

  onSubmitSub(form){
    this._categoriasService.createSubCategoria(form, this.categoria.id).subscribe(
      (categoria: any) => {
        categoria.subCategorias = new Array;
        
        if (!this.categoria.subCategoria)
          this.categoria.subCategoria = new Array;
        
        this.categoria.subCategorias.push(categoria);

        this.showMessage();
      }
    );
    
  }

  criar(categoria: Categoria){
    this.created.emit(categoria);
  }

  showMessage(){
    this.modalMessage.emit({action:"modal",params:['open']});
  }
}
