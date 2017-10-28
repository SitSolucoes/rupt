import { FormBuilder } from '@angular/forms';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Post } from './../../classes/post';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostsService } from './../../services/posts.service';

declare var $: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  url = ConnectionFactory.API_IMAGEM;
  post: Post;
  leitor = null;
  comentarios;
  form;
  maisLidos: Post[];

  


  constructor( private _activatedRoute: ActivatedRoute, 
               private _postService: PostsService,
               private _router: Router,
               private _formBuilder: FormBuilder) {
   }

  ngOnInit() {
    console.log()
    this._activatedRoute.params.subscribe(params => {
        console.log(params['id']);
        this.carregaPosts(+params['id']);
        if(localStorage.getItem('l'))
          this.leitor = localStorage.getItem('l');
        this.form = this._formBuilder.group({
            id: '0',
            comentario: ['', Validators.required],
            comentario_idComentario: ['', [Validators.required, Validators.minLength(3)]],
            post_idPost: [params['id']],
            leitor_idLeitor: [this.leitor.id]
          }); 
    });
  }

  onSubmit(){
    console.log(this.form);
    this._postService.createComentario(this.form).subscribe(
      ( post ) => { 
        this._postService.getComentarios(this.post.id).subscribe(
          (response) => {
            console.log(response);
            this.comentarios = response.comentarios;
          }
        );
      }
    );
  }

  carregaPosts(id){
    this._postService.getPost(id).subscribe(
      ( post ) => { 
        this.post = post;
        this.comentarios = this._postService.getComentarios(post.id);
      }
    );

    this._postService.getMaisLidas().subscribe(
        ( maisLidos: Post[] )  => { this.maisLidos = maisLidos }
    );
  }

}
