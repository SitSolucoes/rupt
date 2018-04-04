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
  variableWidth: true;
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
    this.getSliderPosts();
  }

  openNew(link){
    this._router.navigate(['/noticia', link]);
  }


  getSliderPosts(){
    this._postServices.getSliderPosts().subscribe(
      (response: any) => {
        this.sliderPosts = response;
        this.pronto();
    });
  }

  pronto(){
    this.ready.emit(true);
  }

}
