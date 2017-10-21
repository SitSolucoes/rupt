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

  id_post: number;
  post; categoria; escritor; maislidos;

  constructor( private _activatedRoute: ActivatedRoute, 
               private _postService: PostsService,
               private _router: Router) {
    this.carregaPosts();
   }

  ngOnInit() {
  }

  carregaPosts(id = this._activatedRoute.snapshot.params['id']){
    
    this.id_post = this._activatedRoute.snapshot.params['id'];
    this._postService.getPost(this._activatedRoute.snapshot.params['id']).subscribe(
      (dados) => {
        
        this.post = dados.dados.post;
        this.categoria = dados.dados.categoria;
        this.escritor = dados.dados.escritor;
        this._postService.getMaisLidas().subscribe((posts) => {
          this.maislidos = posts;
        });
      }
    );
  }

  openNew(id){
    //console.log('merda');
    this._router.navigate(['/rupt/noticia', id]);
    this.carregaPosts(id);
  }

}
