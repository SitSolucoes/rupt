import { Router } from '@angular/router';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Renderer, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliderPosts: any;
  sliderPostsHTML:string = '';

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
    console.log('dentro do openNeW()');
    this._router.navigate(['/rupt/noticia', id]);
  }


  getSliderPostsHTML(){
    this._postServices.getSliderPosts().subscribe(
      (retorno: any) => {
        this.sliderPosts = retorno.posts;
    });
  }

}
