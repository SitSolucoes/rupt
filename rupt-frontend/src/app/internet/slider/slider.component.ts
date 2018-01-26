import { Router } from '@angular/router';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Renderer, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { ConnectionFactory } from 'app/classes/connection-factory';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Output() ready = new EventEmitter();

  sliderPosts: any;
  sliderPostsHTML: string = '';
  url = ConnectionFactory.API_IMAGEM;

  constructor(private _postServices: PostsService,
              private _elementRef: ElementRef,
              private _router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getSliderPostsHTML();
  }

  openNew(id){
    this._router.navigate(['/noticia', id]);
  }


  getSliderPostsHTML(){
    this._postServices.getSliderPosts().subscribe(
      (retorno: any) => {
        this.sliderPosts = retorno.posts;
        this.pronto();
    });
  }

  pronto(){
    this.ready.emit(true);
  }

}
