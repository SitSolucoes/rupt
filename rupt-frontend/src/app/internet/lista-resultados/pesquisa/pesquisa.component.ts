import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeitoresService } from 'app/services/leitores.service';
import { Leitor } from 'app/classes/leitor';
import { Post } from 'app/classes/post';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  listLeitores: Leitor[] = new Array();
  listPostUltimos: Post[] = new Array();
  listPostDestaque: Post[] = new Array();

  search: string = "";

  constructor(private _activatedRoute: ActivatedRoute,
              private _leitorService: LeitoresService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (params['search'] && params['search'] != ''){
          this.search = params['search'];

          this.getLeitores();
      }
      else {
          this.search = '';
      }
      /*this._leitorService.getCategoriaByLink(params['categoria']).subscribe(
          ( categoria: Categoria) => { 
              if (categoria){
                  this.categoria = categoria; 
                  this.getPosts();
              }
          }
      )*/
    });
  }

  getLeitores(){
      this._leitorService.pesquisaLeitor(this.search).subscribe(
          ( response ) => { this.listLeitores = response }
      )
  }

  getDestaques(){
      this.listPostDestaque = new Array();
  }

  getUltimos(){
      this.listPostUltimos = new Array();
  }

}
