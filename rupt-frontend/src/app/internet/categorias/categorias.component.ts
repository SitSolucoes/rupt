import { PostsService } from './../../services/posts.service';
import { Categoria } from './../../classes/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LeitoresService } from '../../services/leitores.service';
import { Leitor } from 'app/classes/leitor';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  categorias;
  leitor: Leitor;


  @Output() ready = new EventEmitter();

  constructor(private _categoriasService: CategoriasService,
              private _postsService: PostsService,
              private _leitorService: LeitoresService) {
  }

  ngOnInit() {
    this._leitorService.leitor.subscribe(
      (leitor: Leitor) => { 
        this.leitor = leitor; 
        if (leitor.id){
          this.getPostsLogado();
        }
        else
          this.getPosts();
      }
    );

    this._leitorService.verificaLogin().subscribe(
      ( response )  => { 
          if (response){
            this.getPostsLogado();
          }
          else
            this.getPosts();
       }
    )
  }

  pronto(){
    this.ready.emit(true);
  }

  getPosts(){
    console.log('get post');

    this._postsService.getCategoryPostsSlider().subscribe(
      ( response ) =>{
        this.categorias = response;
        this.pronto();
      }
    );
  }

  getPostsLogado(){
    this._postsService.getHomeLogado(this.leitor.id).subscribe(
        ( response ) => {
          this.categorias = response;
          this.pronto();
        }
      )
  }

}
