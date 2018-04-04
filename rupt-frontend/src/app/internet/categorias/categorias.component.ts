import { PostsService } from './../../services/posts.service';
import { Categoria } from './../../classes/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  categorias;
  @Output() ready = new EventEmitter();

  constructor(private _categoriasService: CategoriasService,
              private _postsService: PostsService) {

                this.getPosts();
  }


  ngOnInit() {
    this.getPosts();
  }

  pronto(){
    this.ready.emit(true);
  }

  getPosts(){
    //se não tiver nada la, tentar pegar pelo nome 

    this._postsService.getCategoryPostsSlider().subscribe(
      ( response ) =>{
        this.categorias = response;
        this.pronto();
      }
    );
  }

}
