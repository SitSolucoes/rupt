import { ConnectionFactory } from 'app/classes/connection-factory';
import { Post } from './../../classes/post';
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
  maisLidos: Post[];

  constructor( private _activatedRoute: ActivatedRoute, 
               private _postService: PostsService,
               private _router: Router) {
   }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
        this.carregaPosts(params['id']);
    });
  }

  carregaPosts(id){
    this._postService.getPost(id).subscribe(
      ( post ) => { this.post = post; }
    );

    this._postService.getMaisLidas().subscribe(
        ( maisLidos: Post[] )  => { this.maisLidos = maisLidos }
    );
  }

}
