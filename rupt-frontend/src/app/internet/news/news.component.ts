import { ActivatedRoute } from '@angular/router';
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

  constructor( private _activatedRoute: ActivatedRoute, 
               private _postService: PostsService) {
    this.id_post = this._activatedRoute.snapshot.params['id'];
    this._postService.getPost(this._activatedRoute.snapshot.params['id']).subscribe(
      (dados) => {
        console.log(dados);
      }
    )
   }

  ngOnInit() {
    
  }

}
