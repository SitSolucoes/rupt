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
              private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getSliderPostsHTML();
  }


  getSliderPostsHTML(){
    console.log(this.sliderPosts);

    this._postServices.getSliderPosts().subscribe(
      (retorno: any) => {
        //console.log(retorno);
        this.sliderPosts = retorno.posts;
    });
  }

}
