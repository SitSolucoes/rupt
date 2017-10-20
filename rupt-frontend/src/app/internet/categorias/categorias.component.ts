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
  
  categorias;

  constructor(private _categoriasService: CategoriasService,
              private _postsService: PostsService) {

                this.getPosts();
  }


  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this._postsService.getCategoryPostsSlider().subscribe(
      (p: any) =>{
        this.categorias = p.posts;
        //console.log(p.posts);
      }
    );
  }

}
