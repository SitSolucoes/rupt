import { CategoriaFiltroService } from './../../services/categoria-filtro.service';
import { CategoriaFiltro } from './../../classes/categoria-filtro';
import { Option } from './../../shared/option';
import { NgForm } from '@angular/forms/src/directives';
import { CategoriasService } from './../../services/categorias.service';
import { Categoria } from './../../classes/categoria';
import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NotificacoesService } from './../../services/notificacoes.service';
import { SugestoesService } from './../../services/sugestoes.service';
import { Sugestao } from './../../classes/sugestao';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  notificacoes;
  countCategoriasFiltro: number = 0;

  categorias: Categoria[];
  categoriasAtivas: Categoria[];
  categoriasFiltro: CategoriaFiltro[] = new Array;
  sugestoes: Sugestao[];
  
  filtroSugestoes: string;
  filtroCategorias: string;
  filtroCategoriasAtivas: string;
  
  categoria: Categoria;
  sugestao: Sugestao;
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalAceitar = new EventEmitter<string|MaterializeAction>();
  modalRecusa = new EventEmitter<string|MaterializeAction>();
  modalMessage = new EventEmitter<string|MaterializeAction>();

  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];

  selectStatus: Option[] = [
    {value: 1, name: 'Ativo'},
    {value: 0, name: 'Inativo'}
  ]

  constructor(
    private _notificacoesService: NotificacoesService,
    private _sugestoesService: SugestoesService,
    private _categoriasService: CategoriasService,
    private _categoriaFiltroService: CategoriaFiltroService
  ) { }

  ngOnInit() {
    this.notificacoes = this._notificacoesService.getNotificacoes();
    this.categoria = new Categoria();
    this.sugestao = new Sugestao();
    this.getListSugestoes();
    this.getCategorias();
    this.getCategoriasAtivas();
  }

  getListSugestoes(){
    this._sugestoesService.getSugestoes().subscribe(
      (sugestoes: Sugestao[]) => {this.sugestoes = sugestoes}
    );
  }

  listSugestoes(){
    if ( this.filtroSugestoes === undefined || this.sugestoes.length === 0 || this.filtroSugestoes.trim() === ''){
      return this.sugestoes;
    }
    return this.sugestoes.filter((v) => {
      if (v.categoria.toLowerCase().indexOf(this.filtroSugestoes.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }

  getCategorias(){
    this._categoriasService.getCategorias().subscribe(
      (categorias: Categoria[]) => {this.categorias = categorias}
    )
  }

  listCategorias(){
    if (this.filtroCategorias === undefined || this.categorias.length === 0 || this.filtroCategorias.trim() === '')
      return this.categorias;
    return this.categorias.filter((v) => {
      if (v.categoria.toLowerCase().indexOf(this.filtroCategorias.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }
  
  getCategoriasAtivas(){
    this._categoriasService.getCategoriasAtivas().subscribe(
      (categorias: Categoria[]) => {this.categoriasAtivas = categorias}
    )
  }

  listCategoriasAtivas(){
    if (this.filtroCategoriasAtivas === undefined || this.categoriasAtivas.length === 0 || this.filtroCategoriasAtivas.trim() === '')
      return this.categoriasAtivas;
    
    return this.categoriasAtivas.filter((v) => {
      if (v.categoria.toLowerCase().indexOf(this.filtroCategoriasAtivas.toLowerCase()) >= 0) 
        return true;
      
      return false;
    });
  }

  checkExist(categoria: Categoria){
    let i;

    for (i = 0; i < this.categoriasFiltro.length; i++){
      if (this.categoriasFiltro[i].categoria.id == categoria.id)
        return i;
    }

    return -1;
  }
  
  addCategoriaFiltro(categoria: Categoria){
      if (this.checkExist(categoria) == -1){
          this.countCategoriasFiltro++;
          
          let categoriaFiltro = new CategoriaFiltro();
          /*categoriaFiltro.ordem = this.countCategoriasFiltro;*/
          categoriaFiltro.categoria = categoria;

          this.categoriasFiltro.push(categoriaFiltro);
      }
  }

  removeCategoriaFiltro(categoriaFiltro: CategoriaFiltro){
    this.countCategoriasFiltro--;

    let index = this.checkExist(categoriaFiltro.categoria);
    this.categoriasFiltro.splice(index,1);
  }

  openModalAceitar(sugestao: Sugestao){
    this.sugestao = sugestao;
    this.modalAceitar.emit({action:"modal",params:['open']});
  }

  openModalRecusa(sugestao: Sugestao) {
    this.sugestao = sugestao;
    this.modalRecusa.emit({action:"modal",params:['open']});
  }

  closeModalRecusa() {
    this.modalRecusa.emit({action:"modal",params:['close']});
  }

  recusa(){
    this._sugestoesService.alteraStatus(this.sugestao.id, "r").subscribe(
      (respose: any) => {
        this.getListSugestoes();
        this.notificacoes = this._notificacoesService.getNotificacoes();
      }
    )
    this.closeModalRecusa();
  }

  openModal(f: NgForm){
    this.categoria = new Categoria();

    f.reset(this.categoria);

    this.modalActions.emit({action:"modal",params:['open']});
  }

  criar(){
    this._sugestoesService.aceitar(this.sugestao, 0).subscribe(
        (response: any) => {
          this.getListSugestoes();
          this.getCategorias();
          this.notificacoes = this._notificacoesService.getNotificacoes();
        }
    );
    
    this.modalAceitar.emit({action:"modal",params:['close']});
    this.showMessage();
  }
  
  criarSubCategoria($categoria: Categoria){
    this._sugestoesService.aceitar(this.sugestao, $categoria.id).subscribe(
        (response: any) => {
          this.getListSugestoes();
          this.getCategorias();
        }
    );
    
    this.modalAceitar.emit({action:"modal",params:['close']});
    this.showMessage();
  }

  onSubmit(form){
    this._categoriasService.createCategoria(form).subscribe(
        (response: any) => {
          this.getCategorias();
        }
    );
    
    this.showMessage();
  }

  showMessage(){
    this.modalMessage.emit({action:"modal",params:['open']});
  }

  saveOrdenacao(){
    this._categoriaFiltroService.save(this.categoriasFiltro, this.countCategoriasFiltro).subscribe(
      (response) => {}
    )
  }

}
