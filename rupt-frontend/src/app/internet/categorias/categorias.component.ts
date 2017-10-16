import { PostsService } from './../../services/posts.service';
import { Categoria } from './../../classes/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private _categoriasService: CategoriasService,
              private _postsService: PostsService) { }

  categorias;

  ngOnInit() {
    //não logado
    console.log("testando");
    //if(localStorage.getItem('l') != null){
      this._postsService.getCategoryPostsSlider().subscribe(
        (p: any) =>{
          console.log(p);
        }
      );
    //}
    //logado
  }

}
