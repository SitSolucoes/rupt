import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'app/services/categorias.service';
import { Categoria } from 'app/classes/categoria';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'app/classes/post';
import { PostsService } from 'app/services/posts.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

    categoria: Categoria;
    posts: Post[];

    constructor(private _categoriaService: CategoriasService,
                private _postService: PostsService,
                private _activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            this._categoriaService.getCategoriaByLink(params['categoria']).subscribe(
                ( categoria: Categoria) => { 
                    if (categoria){
                        this.categoria = categoria; 
                        this.getPosts();
                    }
                }
            )
        });
    }

    getPosts(){
        this._postService.getPostsByCategoria(this.categoria.id).subscribe(
            ( response ) => { 
                this.posts = response
            }
        )
    }

}
